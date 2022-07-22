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
    let drink = eventInput as Drink;
    if (!drink) {
      return;
    }
    console.log(`delete drink id=${drink.id}`);
  }
}
