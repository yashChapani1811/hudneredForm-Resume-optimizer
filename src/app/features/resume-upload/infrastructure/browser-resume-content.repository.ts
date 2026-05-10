import { Injectable } from '@angular/core';
import { isDocxFile, isPdfFile } from '../domain/resume-file-format';

/**
 * Reads raw resume text from supported file formats in the browser.
 */
@Injectable({ providedIn: 'root' })
export class BrowserResumeContentRepository {
  async extractText(file: File): Promise<string> {
    if (isPdfFile(file)) {
      return this.readPdfAsText(file);
    }
    if (isDocxFile(file)) {
      return this.readDocxAsText(file);
    }
    return this.readPlainTextFile(file);
  }

  private async readPdfAsText(file: File): Promise<string> {
    const pdfjsLib = await import('pdfjs-dist');
    const version = (pdfjsLib as { version?: string }).version ?? '4.10.38';
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    const pdf = await loadingTask.promise;

    let fullText = '';
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => ('str' in item ? (item as { str: string }).str : ''))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (pageText) {
        fullText += pageText + '\n';
      }
    }

    const trimmed = fullText.trim();
    if (!trimmed) {
      throw new Error(
        'No text could be extracted from this PDF. It may be scanned images only—try a text-based PDF or a .docx export.',
      );
    }
    return trimmed;
  }

  private async readDocxAsText(file: File): Promise<string> {
    const mammoth = (await import('mammoth')).default;
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const text = (result.value ?? '').trim();
    if (!text) {
      throw new Error('No text could be read from this Word document.');
    }
    return text;
  }

  private async readPlainTextFile(file: File): Promise<string> {
    const text = (await file.text()).trim();
    if (!text) {
      throw new Error('The file is empty.');
    }
    return text;
  }
}
