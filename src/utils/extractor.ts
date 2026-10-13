import { createWorker } from 'tesseract.js';
import { ExtractedParameter } from '../types/report';
import { parseLabText } from './labParser';
import { extractFromPdf } from './pdfParser';

export interface ExtractionProgress {
  stage: 'reading' | 'ocr' | 'parsing' | 'complete' | 'error';
  percent: number;
  message: string;
}

/**
 * Executes OCR on an image file or data URL with progress reporting.
 */
export async function runOcrOnImage(
  imageSource: File | string,
  onProgress?: (progress: ExtractionProgress) => void
): Promise<string> {
  if (onProgress) {
    onProgress({
      stage: 'ocr',
      percent: 10,
      message: 'Initializing local OCR engine...'
    });
  }

  const worker = await createWorker('eng', 1, {
    logger: (m) => {
      if (m.status === 'recognizing text' && onProgress) {
        const p = Math.round((m.progress || 0) * 80) + 10;
        onProgress({
          stage: 'ocr',
          percent: Math.min(95, p),
          message: `Reading document characters: ${Math.round((m.progress || 0) * 100)}%`
        });
      }
    }
  });

  try {
    const ret = await worker.recognize(imageSource);
    return ret.data.text;
  } finally {
    await worker.terminate();
  }
}

/**
 * Unified document extractor handling images, PDFs, and scanned pages.
 */
export async function extractDocumentData(
  file: File,
  onProgress?: (progress: ExtractionProgress) => void
): Promise<{ parameters: ExtractedParameter[]; rawText: string; pageCount: number; previewUrl?: string }> {
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  const isImage = file.type.startsWith('image/') || /\.(jpg|jpeg|png)$/i.test(file.name);

  if (!isPdf && !isImage) {
    throw new Error('Unsupported file format. Please upload a JPG, PNG, or PDF lab report.');
  }

  // 1. Image Workflow
  if (isImage) {
    const previewUrl = URL.createObjectURL(file);
    if (onProgress) {
      onProgress({
        stage: 'reading',
        percent: 5,
        message: 'Loading image file...'
      });
    }

    const text = await runOcrOnImage(file, onProgress);

    if (onProgress) {
      onProgress({
        stage: 'parsing',
        percent: 95,
        message: 'Parsing laboratory parameters & reference intervals...'
      });
    }

    const parameters = parseLabText(text, 1);

    if (onProgress) {
      onProgress({
        stage: 'complete',
        percent: 100,
        message: 'Extraction complete'
      });
    }

    return {
      parameters,
      rawText: text,
      pageCount: 1,
      previewUrl
    };
  }

  // 2. PDF Workflow
  if (onProgress) {
    onProgress({
      stage: 'reading',
      percent: 5,
      message: 'Extracting PDF structure and pages...'
    });
  }

  const pageResults = await extractFromPdf(file, (curr, total, msg) => {
    if (onProgress) {
      onProgress({
        stage: 'reading',
        percent: Math.round((curr / total) * 30),
        message: msg
      });
    }
  });

  let aggregatedText = '';
  const allParams: ExtractedParameter[] = [];

  for (let i = 0; i < pageResults.length; i++) {
    const page = pageResults[i];
    let pageText = page.text;

    // Scanned page fallback: if no text found in PDF text layer, run OCR on rendered canvas
    if (!page.hasTextLayer && page.canvasDataUrl) {
      if (onProgress) {
        onProgress({
          stage: 'ocr',
          percent: 30 + Math.round(((i + 1) / pageResults.length) * 50),
          message: `Running OCR on scanned PDF page ${page.pageNumber}...`
        });
      }
      try {
        const ocrText = await runOcrOnImage(page.canvasDataUrl);
        pageText = ocrText;
      } catch (ocrErr) {
        console.warn(`OCR fallback failed for PDF page ${page.pageNumber}:`, ocrErr);
      }
    }

    aggregatedText += `\n--- Page ${page.pageNumber} ---\n` + pageText;
    const pageParams = parseLabText(pageText, page.pageNumber);
    allParams.push(...pageParams);
  }

  if (onProgress) {
    onProgress({
      stage: 'complete',
      percent: 100,
      message: 'Extraction complete'
    });
  }

  // Use canvas data URL of page 1 as preview if available
  const previewUrl = pageResults[0]?.canvasDataUrl;

  return {
    parameters: allParams,
    rawText: aggregatedText,
    pageCount: pageResults.length,
    previewUrl
  };
}
