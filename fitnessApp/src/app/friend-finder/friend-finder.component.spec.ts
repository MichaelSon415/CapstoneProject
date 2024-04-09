import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendFinderComponent } from './friend-finder.component';

describe('FriendFinderComponent', () => {
  let component: FriendFinderComponent;
  let fixture: ComponentFixture<FriendFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendFinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
