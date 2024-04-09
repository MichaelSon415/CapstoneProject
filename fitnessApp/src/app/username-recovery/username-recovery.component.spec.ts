import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameRecoveryComponent } from './username-recovery.component';

describe('UsernameRecoveryComponent', () => {
  let component: UsernameRecoveryComponent;
  let fixture: ComponentFixture<UsernameRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernameRecoveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsernameRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
