import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientMeasurementDialogComponent } from './ingredient-measurement-dialog.component';

describe('IngredientMeasurementDialogComponent', () => {
  let component: IngredientMeasurementDialogComponent;
  let fixture: ComponentFixture<IngredientMeasurementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientMeasurementDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientMeasurementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
