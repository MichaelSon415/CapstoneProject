import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFontSizeComponent } from './settings-font-size.component';

describe('SettingsFontSizeComponent', () => {
  let component: SettingsFontSizeComponent;
  let fixture: ComponentFixture<SettingsFontSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsFontSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsFontSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
