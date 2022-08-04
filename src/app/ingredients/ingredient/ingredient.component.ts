import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { Ingredient } from 'src/models/ingredient';
import { IngredientConfigDialogComponent } from '../ingredient-config-dialog/ingredient-config-dialog.component';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent {
  @Input()
  public ingredient: Ingredient

  @Output()
  public onDeleteIngredient = new EventEmitter<Ingredient>();

  @Output()
  public onUpdateIngredient = new EventEmitter<Ingredient>();

  constructor(private dialog: MatDialog) { }

  openIngredientConfig() {
    let dialogHandle = this.dialog.open(IngredientConfigDialogComponent, {
      width: '500px',
      data: this.ingredient,
    });

    dialogHandle.afterClosed().pipe(first()).subscribe((result: Ingredient) => {
      if (result) {
        this.ingredient = result;
        this.onUpdateIngredient.emit(this.ingredient);
      }
    });
  }

  deleteIngredientClicked() {
    this.onDeleteIngredient.emit(this.ingredient);
  }
}
