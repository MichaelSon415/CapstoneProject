import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodentryComponent } from './foodentry.component';

describe('FoodentryComponent', () => {
  let component: FoodentryComponent;
  let fixture: ComponentFixture<FoodentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodentryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
