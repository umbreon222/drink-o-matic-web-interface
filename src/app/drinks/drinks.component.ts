import { v4 as uuidv4 } from 'uuid';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Cup } from 'src/models/cup';
import { Drink } from 'src/models/drink';
import { Ingredient } from 'src/models/ingredient';
import { Pump } from 'src/models/pump';
import { ApiService } from '../api.service';
import { SettingsService } from '../settings.service';
import { ConfirmDefaultCupDialogComponent } from './confirm-default-cup-dialog/confirm-default-cup-dialog.component';
import { CupPickerDialogComponent } from './cup-picker-dialog/cup-picker-dialog.component';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit, OnDestroy {
  private settingsSubscription: Subscription;
  private cups: Cup[];
  private ingredients: Ingredient[];
  private pumps: Pump[];
  public drinks: Drink[] = [];
  public filteredDrinks: Drink[] = [];

  constructor(
    private dialog: MatDialog,
    private settingsService: SettingsService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.settingsSubscription = this.settingsService.settings$.subscribe(settings => {
      this.cups = settings.cups;
      this.ingredients = settings.ingredients;
      this.pumps = settings.pumps;
      this.drinks = settings.drinks;
      this.filterDrinks();
    });
  }

  ngOnDestroy() {
    this.settingsSubscription.unsubscribe();
  }

  deleteDrink(eventInput: any) {
    let drinkToDelete = eventInput as Drink;
    if (!drinkToDelete) {
      return;
    }
    
    let drinkIndex = this.drinks.findIndex(drink => drink.id === drinkToDelete.id);
    if (drinkIndex > -1) {
      this.drinks.splice(drinkIndex, 1);
      this.settingsService.storeDrinks(this.drinks).pipe(first()).subscribe();
    }
  }

  addDrink() {
    let newDrink: Drink = {
      id: uuidv4(),
      imageUrl: '/assets/images/drinks/default.jpg',
      name: 'New Drink',
      description: '',
      ingredientMeasurements: [],
      defaultCupId: null,
      starRating: 0,
    };
    
    this.drinks.push(newDrink);
    this.settingsService.storeDrinks(this.drinks).pipe(first()).subscribe();
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

  filterDrinks() {
    if (this.drinks) {
      this.filteredDrinks = [...this.drinks].sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  requestForProcessing(drink: Drink) {
    if (drink.defaultCupId) {
      let dialogHandle = this.dialog.open(ConfirmDefaultCupDialogComponent, {
        width: '500px',
        data: drink.defaultCupId
      });

      dialogHandle.afterClosed().pipe(first()).subscribe((result: Cup) => {
        if (result) {
          this.submitDrinkForProcessing(drink, result);
          return;
        }
        
        this.launchCupPickerDialog(drink);
      });

      return;
    }

    this.launchCupPickerDialog(drink);
  }
  
  launchCupPickerDialog(drink: Drink) {
    let dialogHandle = this.dialog.open(CupPickerDialogComponent, {
      width: '500px'
    });

    dialogHandle.afterClosed().pipe(first()).subscribe((selectedCup: Cup) => {
      if (selectedCup) {
        this.submitDrinkForProcessing(drink, selectedCup);
      }
    });
  }

  // Remove console.log()'s after this has been tested more thoroughly.
  submitDrinkForProcessing(drink: Drink, selectedCup: Cup): void {
    console.log(`Scheduling drink "${drink.name}" using cup "${selectedCup.name}"`);
    const totalParts = drink.ingredientMeasurements.reduce((acc, curr) => { acc += curr.parts; return acc; }, 0);
    drink.ingredientMeasurements.forEach(ingredientMeasurement => {
      let pump = this.pumps.find(pump => pump.ingredientId === ingredientMeasurement.ingredientId);
      let ingredient = this.ingredients.find(ingredient => ingredient.id === ingredientMeasurement.ingredientId);
      if (!ingredient) {
        console.log(`Ingredient not found with id "${ingredientMeasurement.ingredientId}"`);
        return;
      }

      if (!pump) {
        console.log(`No pump found with ingredient "${ingredient.name}"`);
        return;
      }

      const mlToPump = Math.round(selectedCup.volumeMl * (ingredientMeasurement.parts / totalParts) * (ingredient.modifier / 100));
      console.log(`Scheduling pump ${pump.pumpNumber} to pump ${mlToPump}ml of ${ingredient.name}`);
      this.apiService.postPump(pump.pumpNumber, mlToPump).pipe(first()).subscribe();
    });
  }
}
