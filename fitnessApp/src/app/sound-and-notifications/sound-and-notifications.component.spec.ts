import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundAndNotificationsComponent } from './sound-and-notifications.component';

describe('SoundAndNotificationsComponent', () => {
  let component: SoundAndNotificationsComponent;
  let fixture: ComponentFixture<SoundAndNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundAndNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoundAndNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
