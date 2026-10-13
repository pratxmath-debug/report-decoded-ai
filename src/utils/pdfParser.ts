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
    
    // Extract text items
    const textItems = textContent.items
      .map((item: any) => ('str' in item ? item.str : ''))
      .filter((str: string) => str.trim().length > 0);

    const fullPageText = textItems.join(' ');
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
