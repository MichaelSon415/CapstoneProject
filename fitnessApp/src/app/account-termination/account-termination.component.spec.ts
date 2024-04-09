import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTerminationComponent } from './account-termination.component';

describe('AccountTerminationComponent', () => {
  let component: AccountTerminationComponent;
  let fixture: ComponentFixture<AccountTerminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountTerminationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountTerminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
