import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpConfigDialogComponent } from './pump-config-dialog.component';

describe('PumpConfigDialogComponent', () => {
  let component: PumpConfigDialogComponent;
  let fixture: ComponentFixture<PumpConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpConfigDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
