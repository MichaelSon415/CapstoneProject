import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienttrainerInformationPageComponent } from './clienttrainer-information-page.component';

describe('ClienttrainerInformationPageComponent', () => {
  let component: ClienttrainerInformationPageComponent;
  let fixture: ComponentFixture<ClienttrainerInformationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienttrainerInformationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienttrainerInformationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
