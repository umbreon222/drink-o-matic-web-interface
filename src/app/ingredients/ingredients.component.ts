import { v4 as uuidv4 } from 'uuid';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/models/ingredient';
import { first } from 'rxjs/operators';
import { SettingsService } from '../settings.service';
import { Drink } from 'src/models/drink';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  public ingredients: Ingredient[] = [];
  public drinks: Drink[] = [];

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.settingsService.settings$.subscribe(settings => {
      this.ingredients = settings.ingredients;
      this.drinks = settings.drinks;
    });
  }

  updateIngredient(eventInput: any) {
    let ingredientToUpdate = eventInput as Ingredient;
    if (!ingredientToUpdate) {
      return;
    }

    let ingredientIndex = this.ingredients.findIndex(ingredient => ingredient.id === ingredientToUpdate.id);
    if (ingredientIndex > -1) {
      this.ingredients[ingredientIndex] = ingredientToUpdate;
      this.settingsService.storeIngredients(this.ingredients).pipe(first()).subscribe();
    }
  }

  addIngredient() {
    let newIngredient: Ingredient = {
      id: uuidv4(),
      name: 'New Ingredient',
      modifier: 100,
    };

    this.ingredients.push(newIngredient);
    this.settingsService.storeIngredients(this.ingredients).pipe(first()).subscribe();
  }

  deleteIngredient(eventInput: any) {
    let ingredientToDelete = eventInput as Ingredient;
    if (!ingredientToDelete) {
      return;
    }

    let drinksNeedSave = false;
    this.drinks.forEach(drink => {
      let indexesToRemove: number[] = [];
      drink.ingredientMeasurements.forEach((ingredientMeasurement, index) => {
        if (ingredientMeasurement.ingredientId === ingredientToDelete.id) {
          drinksNeedSave = true;
          indexesToRemove.push(index);
        }
      });

      indexesToRemove.forEach(indexToRemove => {
        drink.ingredientMeasurements.splice(indexToRemove, 1);
      });
    });

    if (drinksNeedSave) {
      this.settingsService.storeDrinks(this.drinks).pipe(first()).subscribe();
    }
    
    let ingredientIndex = this.ingredients.findIndex(ingredient => ingredient.id === ingredientToDelete.id);
    if (ingredientIndex > -1) {
      this.ingredients.splice(ingredientIndex, 1);
      this.settingsService.storeIngredients(this.ingredients).pipe(first()).subscribe();
    }
  }
}
