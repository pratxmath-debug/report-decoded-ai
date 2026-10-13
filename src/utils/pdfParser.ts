import * as pdfjsLib from 'pdfjs-dist';

// Configure worker safely
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.8.69'}/pdf.worker.min.mjs`;
} catch (e) {
  console.warn('PDF.js worker initialization notice:', e);
}

export interface PDFPageResult {
  pageNumber: number;
  text: string;
  hasTextLayer: boolean;
  canvasDataUrl?: string;
}

/**
 * Extracts text and rendered canvases from a PDF file using PDF.js.
 */
export async function extractFromPdf(
  file: File,
  onProgress?: (current: number, total: number, message: string) => void
): Promise<PDFPageResult[]> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    useSystemFonts: true
  });

  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  const results: PDFPageResult[] = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    if (onProgress) {
      onProgress(pageNum, numPages, `Reading PDF page ${pageNum} of ${numPages}...`);
    }

    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    
    // Extract text items with line structure preservation
    const fullPageText = reconstructTextWithLines(textContent.items);
    const hasTextLayer = fullPageText.trim().length > 25;

    let canvasDataUrl: string | undefined = undefined;

    // Render canvas for preview and for OCR fallback if page is a scan
    try {
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        await page.render(renderContext).promise;
        canvasDataUrl = canvas.toDataURL('image/png');
      }
    } catch (err) {
      console.warn(`Could not render canvas for page ${pageNum}:`, err);
    }

    results.push({
      pageNumber: pageNum,
      text: fullPageText,
      hasTextLayer,
      canvasDataUrl
    });
  }

  return results;
}

export interface PDFTextItemLike {
  str?: string;
  transform?: number[];
  width?: number;
  height?: number;
  hasEOL?: boolean;
}

/**
 * Reconstructs lines of text from PDF.js textContent items using coordinate grouping.
 * Sorts items top-to-bottom and left-to-right, grouping text items sharing the same vertical line.
 */
export function reconstructTextWithLines(items: any[]): string {
  if (!items || !Array.isArray(items) || items.length === 0) return '';

  const validItems = items.filter(
    (item) => item && typeof item.str === 'string' && item.str.length > 0
  );

  if (validItems.length === 0) return '';

  // Check if transform coordinates are available
  const hasCoordinates = validItems.some(
    (item) => Array.isArray(item.transform) && item.transform.length >= 6
  );

  if (!hasCoordinates) {
    // Fallback: build text chunks, respecting hasEOL when present
    const lines: string[] = [];
    let currentLine = '';
    for (const item of validItems) {
      currentLine += (currentLine.length > 0 ? ' ' : '') + item.str;
      if (item.hasEOL) {
        lines.push(currentLine.trim());
        currentLine = '';
      }
    }
    if (currentLine.trim().length > 0) {
      lines.push(currentLine.trim());
    }
    return lines.length > 0 ? lines.join('\n') : validItems.map((i) => i.str).join(' ');
  }

  // Items have coordinates.
  // In standard PDF coordinate space:
  // transform: [scaleX, skewY, skewX, scaleY, tx, ty]
  // tx = transform[4] (horizontal), ty = transform[5] (vertical)
  // Higher Y indicates higher on the page.
  interface PositionedItem {
    str: string;
    x: number;
    y: number;
    hasEOL: boolean;
  }

  const positioned: PositionedItem[] = validItems.map((item) => ({
    str: item.str,
    x: Array.isArray(item.transform) ? item.transform[4] : 0,
    y: Array.isArray(item.transform) ? item.transform[5] : 0,
    hasEOL: Boolean(item.hasEOL)
  }));

  // Sort primarily by Y descending (top to bottom), then by X ascending (left to right)
  positioned.sort((a, b) => {
    const diffY = b.y - a.y;
    if (Math.abs(diffY) > 4.0) {
      return diffY;
    }
    return a.x - b.x;
  });

  // Group items sharing the same line baseline (within 4pt vertical threshold)
  const lineGroups: PositionedItem[][] = [];
  let currentGroup: PositionedItem[] = [];
  let currentY: number | null = null;

  for (const item of positioned) {
    if (currentY === null) {
      currentGroup.push(item);
      currentY = item.y;
    } else {
      const prevItem = currentGroup[currentGroup.length - 1];
      const isSameLine = Math.abs(currentY - item.y) <= 4.0 && !prevItem?.hasEOL;

      if (isSameLine) {
        currentGroup.push(item);
      } else {
        // Sort finished line group from left to right
        currentGroup.sort((a, b) => a.x - b.x);
        lineGroups.push(currentGroup);
        currentGroup = [item];
        currentY = item.y;
      }
    }
  }

  if (currentGroup.length > 0) {
    currentGroup.sort((a, b) => a.x - b.x);
    lineGroups.push(currentGroup);
  }

  // Assemble into clean multiline text string
  const outputLines = lineGroups
    .map((group) => {
      return group
        .map((it) => it.str)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
    })
    .filter((line) => line.length > 0);

  return outputLines.join('\n');
}
