import { Component, OnInit } from '@angular/core';
import { Drink } from 'src/models/drink';
import { DrinksService } from './drinks.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {
  public drinks: Drink[] = [];

  constructor(private drinksService: DrinksService) { }

  ngOnInit() {
    this.drinks = this.drinksService.getDrinks();
  }

  deleteDrink(eventInput: any) {
    let drinkToDelete = eventInput as Drink;
    if (!drinkToDelete) {
      return;
    }
    let drinkIndex = this.drinks.findIndex(drink => drink.id === drinkToDelete.id);
    if (drinkIndex > -1) {
      this.drinks.splice(drinkIndex, 1);
    }
  }
}
