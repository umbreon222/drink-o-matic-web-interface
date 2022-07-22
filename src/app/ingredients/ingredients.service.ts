import { Injectable } from '@angular/core';
import { Ingredient } from 'src/models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private ingredients: Ingredient[] = [];

  constructor() {
    this.loadIngredients();
  }

  loadIngredients(): void {
    this.ingredients = [
      {
        id: "FAKE_INGREDIENT_ID",
        name: "Vodka",
      },
    ];
  }

  storeIngredients(): void {
    console.log("storeIngredients()");
  }

  getIngredient(ingredientId: string): Ingredient | undefined {
    return this.ingredients.find(ingredient => ingredient.id === ingredientId);
  }

  getIngredients(): Ingredient[] {
    return [...this.ingredients];
  }
}
