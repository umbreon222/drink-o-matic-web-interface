import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DrinkConfigDialogComponent } from '../drink-config-dialog/drink-config-dialog.component';
import { Drink } from 'src/models/drink';
import { IngredientsService } from 'src/app/ingredients/ingredients.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit {
  @Input()
  public drink: Drink;

  @Output()
  public onDeleteDrink: EventEmitter<Drink> = new EventEmitter<Drink>();

  public ingredientNames: string[];

  constructor(public dialog: MatDialog, private ingredientsService: IngredientsService) { }

  ngOnInit(): void {
    this.onDrinkChanged();
  }

  openDrinkConfig() {
    let dialogHandle = this.dialog.open(DrinkConfigDialogComponent, {
      width: '500px',
      data: this.drink,
    });

    dialogHandle.afterClosed().subscribe((result: Drink) => {
      if (result) {
        this.drink = result;
        this.onDrinkChanged();
      }
    });
  }

  onDrinkChanged() {
    let tempIngredientNames: string[] = [];
    this.drink.ingredientIds.forEach(ingredientId => {
      let ingredient = this.ingredientsService.getIngredient(ingredientId);
      if (ingredient) {
        tempIngredientNames.push(ingredient.name);
      }
    });
    this.ingredientNames = tempIngredientNames;
  }

  deleteDrinkClicked() {
    this.onDeleteDrink.emit(this.drink);
  }
}
