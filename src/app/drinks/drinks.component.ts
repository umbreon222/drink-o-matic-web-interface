import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Drink } from 'src/models/drink';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit, OnDestroy {
  private settingsSubscription: Subscription;
  public drinks: Drink[] = [];

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.settingsSubscription = this.settingsService.settings$.subscribe(settings => {
      this.drinks = settings.drinks;
    });
  }

  ngOnDestroy() {
    this.settingsSubscription.unsubscribe();
  }

  deleteDrink(eventInput: any) {
    console.log('deleteDrink(): Not implemented yet.');
    return;
    let drinkToDelete = eventInput as Drink;
    if (!drinkToDelete) {
      return;
    }
    
    let drinkIndex = this.drinks.findIndex(drink => drink.id === drinkToDelete.id);
    if (drinkIndex > -1) {
      this.drinks.splice(drinkIndex, 1);
    }
  }

  updateDrink(eventInput: any) {
    let drinkToUpdate = eventInput as Drink;
    if (!drinkToUpdate) {
      return;
    }

    let drinkIndex = this.drinks.findIndex(drink => drink.id === drinkToUpdate.id);
    if (drinkIndex > -1) {
      this.drinks[drinkIndex] = drinkToUpdate;
      this.settingsService.storeDrinks(this.drinks).pipe(first()).subscribe();
    }
  }
}
