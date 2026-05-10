import { Injectable, inject } from '@angular/core';
import { ExtractResumeTextUseCase, type ExtractResumeTextResult } from './extract-resume-text.use-case';

/**
 * UI-facing API for resume file extraction (hides use case / repository wiring).
 */
@Injectable({ providedIn: 'root' })
export class ResumeUploadFacade {
  private readonly extractResumeText = inject(ExtractResumeTextUseCase);

  extractTextFromFile(file: File): Promise<ExtractResumeTextResult> {
    return this.extractResumeText.execute(file);
  }
}
