import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFitnessCalorieComponent } from './settings-fitness-calorie.component';

describe('SettingsFitnessCalorieComponent', () => {
  let component: SettingsFitnessCalorieComponent;
  let fixture: ComponentFixture<SettingsFitnessCalorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsFitnessCalorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsFitnessCalorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
