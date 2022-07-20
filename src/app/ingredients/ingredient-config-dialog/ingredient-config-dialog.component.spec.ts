import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientConfigDialogComponent } from './ingredient-config-dialog.component';

describe('IngredientConfigDialogComponent', () => {
  let component: IngredientConfigDialogComponent;
  let fixture: ComponentFixture<IngredientConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientConfigDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
