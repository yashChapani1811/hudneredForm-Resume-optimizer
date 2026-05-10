import { Component, signal } from '@angular/core';
import { ResumeAnlyses } from './features/ui/pages/resume-anlyses/resume-anlyses';

@Component({
  selector: 'app-root',
  imports: [ResumeAnlyses],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
