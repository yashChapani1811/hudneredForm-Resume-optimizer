import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeAnlyses } from './resume-anlyses';

describe('ResumeAnlyses', () => {
  let component: ResumeAnlyses;
  let fixture: ComponentFixture<ResumeAnlyses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeAnlyses],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeAnlyses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
