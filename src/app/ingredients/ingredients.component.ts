import { Component } from '@angular/core';
import { Ingredient } from 'src/models/ingredient';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent {
  public ingredients: Ingredient[] = [];

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.settingsService.settings$.subscribe(settings => {
      this.ingredients = settings.ingredients;
    });
  }

  deleteIngredient(eventInput: any) {
    console.log('deleteIngredient(): Not implemented yet.');
    return;
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
