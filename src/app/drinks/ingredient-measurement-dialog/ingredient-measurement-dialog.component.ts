import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ingredient-measurement-dialog',
  templateUrl: './ingredient-measurement-dialog.component.html',
  styleUrls: ['./ingredient-measurement-dialog.component.scss']
})
export class IngredientMeasurementDialogComponent {
  public name: string;
  public parts: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.name = data.name;
    this.parts = data.parts;
  }
}
