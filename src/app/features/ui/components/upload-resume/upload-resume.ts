import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ResumeAnalysisService } from '../../../resume-analysis/resume-analysis.service';
import { ResumeUploadFacade } from '../../../resume-upload/application/resume-upload.facade';

@Component({
  selector: 'app-upload-resume',
  imports: [],
  templateUrl: './upload-resume.html',
  styleUrl: './upload-resume.css',
})
export class UploadResume {
  extractedText: string = '';
  isReading: boolean = false;
  errorMessage: string = '';
  selectedFileName: string = '';
  isDragOver: boolean = false;
  private dragCounter = 0;
  private readonly resumeAnalysis = inject(ResumeAnalysisService);
  private readonly resumeUpload = inject(ResumeUploadFacade);

  /** Avoid id collisions with the marketing HTML (`fileInput`, `chooseFileBtn`) and `js/main.js` listeners. */
  readonly resumeFileInputId = `hf-ng-resume-file-${this.newInputSuffix()}`;

  file: File | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private newInputSuffix(): string {
    if (isPlatformBrowser(this.platformId) && typeof globalThis.crypto?.randomUUID === 'function') {
      return globalThis.crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }

  async triggerAnalysis(): Promise<void> {
    if (this.file) {
      await this.handleFile(this.file);
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      this.file = file;
      this.selectedFileName = file.name;
      this.resumeAnalysis.markFileUploaded(true);
    }
    target.value = '';
  }

  onDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragCounter++;
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter <= 0) {
      this.dragCounter = 0;
      this.isDragOver = false;
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  async onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragCounter = 0;
    this.isDragOver = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.resumeAnalysis.markFileUploaded(true);
    }
    await this.handleFile(file ?? undefined);
  }

  private async handleFile(file: File | undefined) {
    this.extractedText = '';
    this.errorMessage = '';

    if (!file) {
      return;
    }

    this.isReading = true;

    try {
      const result = await this.resumeUpload.extractTextFromFile(file);
      if (!result.ok) {
        this.errorMessage = result.error;
        return;
      }
      this.extractedText = result.text;
      this.file = file;
      this.selectedFileName = file.name;
      this.resumeAnalysis.syncAfterExtraction(this.extractedText);
    } catch (error) {
      console.error('Error reading resume file:', error);
      this.errorMessage = `Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`;
    } finally {
      this.isReading = false;
    }

    if (this.extractedText.trim()) {
      void this.resumeAnalysis.runAnalysis();
    }
  }
}
