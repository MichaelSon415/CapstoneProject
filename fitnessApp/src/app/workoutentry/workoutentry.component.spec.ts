import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutentryComponent } from './workoutentry.component';

describe('WorkoutentryComponent', () => {
  let component: WorkoutentryComponent;
  let fixture: ComponentFixture<WorkoutentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutentryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
