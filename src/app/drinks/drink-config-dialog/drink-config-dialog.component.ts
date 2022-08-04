import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SettingsService } from 'src/app/settings.service';
import { Drink } from 'src/models/drink';
import { Ingredient } from 'src/models/ingredient';
import { IngredientMeasurement } from 'src/models/ingredient-measurement';

@Component({
  selector: 'app-drink-config-dialog',
  templateUrl: './drink-config-dialog.component.html',
  styleUrls: ['./drink-config-dialog.component.scss']
})
export class DrinkConfigDialogComponent implements OnInit {
  drinkForm: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredients: Ingredient[] = [];
  filteredIngredients: Observable<Ingredient[]>;
  allIngredients: Ingredient[] = [];
  ingredientNameCriteriaControl = new FormControl('');

  @ViewChild('ingredientsInput') ingredientsInput: ElementRef<HTMLInputElement>;

  constructor(
    private dialogRef: MatDialogRef<DrinkConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private drink: Drink,
    private settingsService: SettingsService
  ) { }
  
  ngOnInit(): void {
    this.settingsService.settings$.subscribe(settings => {
      this.allIngredients = settings.ingredients;
      this.ingredients = this.allIngredients.filter(ingredient => this.drink.ingredientMeasurements.some(ingredientMeasurement => ingredientMeasurement.ingredientId === ingredient.id));
      this.drinkForm = new FormGroup({
        imageUrl: new FormControl(this.drink.imageUrl),
        name: new FormControl(this.drink.name),
        description: new FormControl(this.drink.description),
        starRating: new FormControl(this.drink.starRating),
        ingredientNameCriteria: this.ingredientNameCriteriaControl
      });

      
      this.filteredIngredients = this.ingredientNameCriteriaControl.valueChanges.pipe(
        startWith(null),
        map((ingredientName: string | null) => this._filter(ingredientName)),
      );
    });
  }

  onSubmit() {
    let ingredientMeasurements = new Array<IngredientMeasurement>();
    this.ingredients.forEach(ingredient => {
      ingredientMeasurements.push({ ingredientId: ingredient.id, parts: 1 });
    });

    const updatedDrink: Drink = {
      id: this.drink.id,
      imageUrl: this.drinkForm.value.imageUrl,
      name: this.drinkForm.value.name,
      description: this.drinkForm.value.description,
      ingredientMeasurements: ingredientMeasurements,
      defaultCupId: this.drink.defaultCupId,
      starRating: this.drinkForm.value.starRating
    }

    this.dialogRef.close(updatedDrink);
  }
  
  remove(ingredientId: string): void {
    this.ingredients.splice(this.ingredients.findIndex(ingredient => ingredient.id === ingredientId), 1);
    const index = this.ingredients.findIndex(ingredient => ingredient.id === ingredientId);

    if (index > -1) {
      this.ingredients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let selectedIngredient = this.allIngredients.find(ingredient => ingredient.id === event.option.value);
    if (!selectedIngredient || this.ingredients.some(ingredient => ingredient.id === selectedIngredient?.id)) {
      return;
    }

    this.ingredients.push(selectedIngredient);
    this.ingredientsInput.nativeElement.value = '';
    this.ingredientNameCriteriaControl.setValue(null);
  }

  private _filter(value: string | null): Ingredient[] {
    let availableIngredients = this.allIngredients.filter(ingredient => !this.ingredients.some(usedIngredient => usedIngredient.id === ingredient.id));
    if (!value) {
      return availableIngredients;
    }
    
    const filterValue = value.toLowerCase();
    return availableIngredients.filter(ingredient => ingredient.name.toLowerCase().includes(filterValue));
  }
}
