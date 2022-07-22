import { Inject, Injectable } from '@angular/core';
import { Ingredient } from 'src/models/ingredient';
import { Settings, SETTINGS } from 'src/models/settings';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private ingredients: Ingredient[] = [];

  constructor(@Inject(SETTINGS) settings: Settings) {
    this.ingredients = settings.ingredients;
  }

  getIngredient(ingredientId: string): Ingredient | undefined {
    return this.ingredients.find(ingredient => ingredient.id === ingredientId);
  }

  getIngredients(): Ingredient[] {
    return [...this.ingredients];
  }
}
