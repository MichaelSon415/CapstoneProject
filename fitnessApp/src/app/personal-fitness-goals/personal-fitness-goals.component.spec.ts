import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalFitnessGoalsComponent } from './personal-fitness-goals.component';

describe('PersonalFitnessGoalsComponent', () => {
  let component: PersonalFitnessGoalsComponent;
  let fixture: ComponentFixture<PersonalFitnessGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalFitnessGoalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalFitnessGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
