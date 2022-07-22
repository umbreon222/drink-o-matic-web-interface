import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ingredient } from 'src/models/ingredient';
import { IngredientConfigDialogComponent } from '../ingredient-config-dialog/ingredient-config-dialog.component';
import { IngredientsService } from '../ingredients.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent {
  @Input()
  public ingredient: Ingredient

  @Output()
  public onDeleteIngredient: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  constructor(public dialog: MatDialog, private ingredientsService: IngredientsService) { }

  openIngredientConfig() {
    let dialogHandle = this.dialog.open(IngredientConfigDialogComponent, {
      width: '500px',
      data: this.ingredient,
    });

    dialogHandle.afterClosed().subscribe((result: Ingredient) => {
      if (result) {
        this.ingredient = result;
      }
    });
  }

  deleteIngredientClicked() {
    this.onDeleteIngredient.emit(this.ingredient);
  }
}
