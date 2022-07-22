import { Inject, Injectable } from '@angular/core';
import { Drink } from 'src/models/drink';
import { Settings, SETTINGS } from 'src/models/settings';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {
  private drinks: Drink[] = [];

  constructor(@Inject(SETTINGS) settings: Settings) {
    this.drinks = settings.drinks;
  }

  getDrinks(): Drink[] {
    return [...this.drinks];
  }
}
