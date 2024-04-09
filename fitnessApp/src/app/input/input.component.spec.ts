import { ComponentFixture, TestBed } from '@angular/core/testing';

import { inputComponent } from './input.component';

describe('inputComponent', () => {
  let component: inputComponent;
  let fixture: ComponentFixture<inputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ inputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(inputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
