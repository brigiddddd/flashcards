import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStackDialogComponent } from './add-stack-dialog.component';

describe('AddStackDialogComponent', () => {
  let component: AddStackDialogComponent;
  let fixture: ComponentFixture<AddStackDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStackDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
