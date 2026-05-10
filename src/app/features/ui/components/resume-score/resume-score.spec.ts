import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeScore } from './resume-score';

describe('ResumeScore', () => {
  let component: ResumeScore;
  let fixture: ComponentFixture<ResumeScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeScore],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeScore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
