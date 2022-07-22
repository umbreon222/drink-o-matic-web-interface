import { Component } from '@angular/core';
import { Ingredient } from 'src/models/ingredient';
import { IngredientsService } from './ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent {
  public ingredients: Ingredient[] = [];

  constructor(private ingredientsService: IngredientsService) { }

  ngOnInit() {
    this.ingredients = this.ingredientsService.getIngredients();
  }

  deleteIngredient(eventInput: any) {
    let ingredientToDelete = eventInput as Ingredient;
    if (!ingredientToDelete) {
      return;
    }
    let ingredientIndex = this.ingredients.findIndex(ingredient => ingredient.id === ingredientToDelete.id);
    if (ingredientIndex > -1) {
      this.ingredients.splice(ingredientIndex, 1);
    }
  }
}
