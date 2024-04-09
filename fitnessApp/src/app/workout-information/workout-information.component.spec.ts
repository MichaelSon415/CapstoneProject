import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutInformationComponent } from './workout-information.component';

describe('WorkoutInformationComponent', () => {
  let component: WorkoutInformationComponent;
  let fixture: ComponentFixture<WorkoutInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
