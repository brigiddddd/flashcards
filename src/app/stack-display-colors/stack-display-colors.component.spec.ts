import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackDisplayColorsComponent } from './stack-display-colors.component';

describe('StackDisplayColorsComponent', () => {
  let component: StackDisplayColorsComponent;
  let fixture: ComponentFixture<StackDisplayColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackDisplayColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackDisplayColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
