import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialInviteComponent } from './social-invite.component';

describe('SocialInviteComponent', () => {
  let component: SocialInviteComponent;
  let fixture: ComponentFixture<SocialInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialInviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
