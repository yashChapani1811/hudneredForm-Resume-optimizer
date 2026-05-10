import { Component, inject } from '@angular/core';
import { ResumeAnalysisService } from '../../../resume-analysis/resume-analysis.service';
import type { ResumeAnalysis } from '../../../resume-analysis/resume-analysis.types';

@Component({
  selector: 'app-resume-score',
  imports: [],
  templateUrl: './resume-score.html',
  styleUrl: './resume-score.css',
})
export class ResumeScore {
  readonly ai = inject(ResumeAnalysisService);

  topSuggestions(r: ResumeAnalysis): string[] {
    const fromImprovements = r.improvements.map((x) => x.detail).filter((x) => !!x.trim());
    const fromAts = r.atsNotes.filter((x) => !!x.trim());
    return [...fromImprovements, ...fromAts].slice(0, 3);
  }

  scoreSummary(r: ResumeAnalysis): string {
    if (r.overallScore >= 90) return 'Excellent baseline. Keep polishing role-specific keywords.';
    if (r.overallScore >= 75) return 'Strong profile. Tighten impact metrics to push into top range.';
    if (r.overallScore >= 60) return 'Solid start. Improve quantified outcomes and ATS keyword coverage.';
    return 'Foundation needs work. Focus first on structure, metrics, and role-aligned skills.';
  }
}
