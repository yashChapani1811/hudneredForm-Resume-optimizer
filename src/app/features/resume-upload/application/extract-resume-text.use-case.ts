import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  isLegacyWordDoc,
  isSupportedResumeFile,
} from '../domain/resume-file-format';
import { BrowserResumeContentRepository } from '../infrastructure/browser-resume-content.repository';

export type ExtractResumeTextResult =
  | { ok: true; text: string }
  | { ok: false; error: string };

@Injectable({ providedIn: 'root' })
export class ExtractResumeTextUseCase {
  private readonly repository = inject(BrowserResumeContentRepository);
  private readonly platformId = inject(PLATFORM_ID);

  async execute(file: File): Promise<ExtractResumeTextResult> {
    if (isLegacyWordDoc(file)) {
      return {
        ok: false,
        error:
          'Older Word .doc files cannot be read in the browser. Save your resume as .docx (or export .txt) and upload again.',
      };
    }

    if (!isSupportedResumeFile(file)) {
      return {
        ok: false,
        error: 'Please upload a PDF, Word document (.docx), .txt, or .md file.',
      };
    }

    if (!isPlatformBrowser(this.platformId)) {
      return { ok: false, error: 'Reading a file is only available in the browser.' };
    }

    try {
      const text = await this.repository.extractText(file);
      return { ok: true, text };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unknown error';
      return { ok: false, error: `Failed to read file: ${message}` };
    }
  }
}
