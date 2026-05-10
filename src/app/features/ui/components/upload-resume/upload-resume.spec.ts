import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadResume } from './upload-resume';
import { ResumeAnalysisService } from '../../../resume-analysis/resume-analysis.service';
import { ResumeUploadFacade } from '../../../resume-upload/application/resume-upload.facade';

describe('UploadResume', () => {
  let component: UploadResume;
  let fixture: ComponentFixture<UploadResume>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadResume],
      providers: [
        {
          provide: ResumeAnalysisService,
          useValue: {
            syncAfterExtraction: (): void => undefined,
            runAnalysis: async (): Promise<void> => undefined,
          },
        },
        {
          provide: ResumeUploadFacade,
          useValue: {
            extractTextFromFile: async (): Promise<{ ok: true; text: string }> => ({
              ok: true,
              text: 'Sample resume text',
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadResume);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
