import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupConfigDialogComponent } from './cup-config-dialog.component';

describe('CupConfigDialogComponent', () => {
  let component: CupConfigDialogComponent;
  let fixture: ComponentFixture<CupConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CupConfigDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CupConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
