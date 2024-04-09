import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentalWellnessTrackerComponent } from './mental-wellness-tracker.component';

describe('MentalWellnessTrackerComponent', () => {
  let component: MentalWellnessTrackerComponent;
  let fixture: ComponentFixture<MentalWellnessTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentalWellnessTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentalWellnessTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
