import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InDephWorkoutMainComponent } from './in-deph-workout-main.component';

describe('InDephWorkoutMainComponent', () => {
  let component: InDephWorkoutMainComponent;
  let fixture: ComponentFixture<InDephWorkoutMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InDephWorkoutMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InDephWorkoutMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
