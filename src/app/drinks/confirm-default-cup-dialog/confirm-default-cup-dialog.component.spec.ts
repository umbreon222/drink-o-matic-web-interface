import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDefaultCupDialogComponent } from './confirm-default-cup-dialog.component';

describe('ConfirmDefaultCupDialogComponent', () => {
  let component: ConfirmDefaultCupDialogComponent;
  let fixture: ComponentFixture<ConfirmDefaultCupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDefaultCupDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDefaultCupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
