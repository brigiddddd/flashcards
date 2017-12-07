import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerWrapperComponent } from './color-picker-wrapper.component';

describe('ColorPickerWrapperComponent', () => {
  let component: ColorPickerWrapperComponent;
  let fixture: ComponentFixture<ColorPickerWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorPickerWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
