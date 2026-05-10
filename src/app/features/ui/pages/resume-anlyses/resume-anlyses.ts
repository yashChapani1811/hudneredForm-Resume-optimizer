import { Component, inject } from '@angular/core';
import { UploadResume } from '../../components/upload-resume/upload-resume';
import { ResumeScore } from '../../components/resume-score/resume-score';
import { ResumeAnalysisService } from '../../../resume-analysis/resume-analysis.service';

@Component({
  selector: 'app-resume-anlyses',
  imports: [UploadResume, ResumeScore],
  templateUrl: './resume-anlyses.html',
  styleUrl: './resume-anlyses.css',
})
export class ResumeAnlyses {
  readonly ai = inject(ResumeAnalysisService);
}
