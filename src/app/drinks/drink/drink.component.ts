import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DrinkConfigDialogComponent } from '../drink-config-dialog/drink-config-dialog.component';
import { Drink } from 'src/models/drink';
import { Ingredient } from 'src/models/ingredient';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit {
  public drink: Drink;
  public ingredientNames: string[];

  constructor(public dialog: MatDialog) {
    this.drink = {
      imageUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      name: 'Drink Name',
      description: 'Drink Description',
      ingredients: [ { name: 'Ingredient 1' } ],
      starRating: 5,
    }
    this.onDrinkChanged();
  }

  ngOnInit(): void {
  }

  openDrinkConfig() {
    let dialogHandle = this.dialog.open(DrinkConfigDialogComponent, {
      width: '250px',
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
    this.ingredientNames = this.drink.ingredients.map(ingredient => ingredient.name);
  }

  deleteDrinkClicked() {
    console.log('deleteDrinkClicked()');
  }
}
