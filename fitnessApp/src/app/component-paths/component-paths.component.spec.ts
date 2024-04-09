import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPathsComponent } from './component-paths.component';

describe('ComponentPathsComponent', () => {
  let component: ComponentPathsComponent;
  let fixture: ComponentFixture<ComponentPathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentPathsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
