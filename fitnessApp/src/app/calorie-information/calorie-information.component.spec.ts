import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalorieInformationComponent } from './calorie-information.component';

describe('CalorieInformationComponent', () => {
  let component: CalorieInformationComponent;
  let fixture: ComponentFixture<CalorieInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalorieInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalorieInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
