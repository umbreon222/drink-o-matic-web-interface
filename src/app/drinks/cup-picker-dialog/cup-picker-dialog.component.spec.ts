import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupPickerDialogComponent } from './cup-picker-dialog.component';

describe('CupPickerDialogComponent', () => {
  let component: CupPickerDialogComponent;
  let fixture: ComponentFixture<CupPickerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CupPickerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CupPickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
