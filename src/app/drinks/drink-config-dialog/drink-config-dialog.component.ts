import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith, first } from 'rxjs/operators';
import { SettingsService } from 'src/app/settings.service';
import { Cup } from 'src/models/cup';
import { Drink } from 'src/models/drink';
import { Ingredient } from 'src/models/ingredient';
import { IngredientMeasurement } from 'src/models/ingredient-measurement';
import { IngredientMeasurementDialogComponent } from '../ingredient-measurement-dialog/ingredient-measurement-dialog.component';

@Component({
  selector: 'app-drink-config-dialog',
  templateUrl: './drink-config-dialog.component.html',
  styleUrls: ['./drink-config-dialog.component.scss']
})
export class DrinkConfigDialogComponent implements OnInit {
  @ViewChild('ingredientsNameCriteriaInput')
  ingredientsNameCriteriaInput: ElementRef<HTMLInputElement>;

  drinkForm: FormGroup;
  separatorKeysCodes: number[] = [ ENTER, COMMA ];
  allIngredients: Ingredient[];
  ingredientNameCriteriaControl = new FormControl('');
  ingredientMeasurements: IngredientMeasurement[];
  ingredients: Ingredient[];
  filteredIngredients: Observable<Ingredient[]>;
  allCups: Cup[];

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DrinkConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private drink: Drink,
    private formBuilder: FormBuilder,
    private settingsService: SettingsService
  ) {
    this.ingredientMeasurements = drink.ingredientMeasurements;
  }
  
  ngOnInit(): void {
    this.settingsService.settings$.subscribe(settings => {
      this.allIngredients = settings.ingredients;
      this.ingredients = this.allIngredients.filter(ingredient => this.ingredientMeasurements.some(ingredientMeasurement => ingredientMeasurement.ingredientId === ingredient.id));
      this.allCups = settings.cups;
      this.drinkForm = this.formBuilder.group({
        imageUrl: this.drink.imageUrl,
        name: this.drink.name,
        description: this.drink.description,
        defaultCupId: this.drink.defaultCupId,
        starRating: this.drink.starRating,
        ingredientNameCriteria: this.ingredientNameCriteriaControl
      });
      
      this.filteredIngredients = this.ingredientNameCriteriaControl.valueChanges.pipe(
        startWith(null),
        map((ingredientName: string | null) => this._filter(ingredientName)),
      );
    });
  }

  launchAddIngredientMeasurementDialog(ingredient: Ingredient): void {
    if (!ingredient) {
      return;
    }

    let dialogHandle = this.dialog.open(IngredientMeasurementDialogComponent, {
      width: '250px',
      data: { name: ingredient.name, parts: 1 }
    });

    dialogHandle.afterClosed().pipe(first()).subscribe((result: number) => {
      if (result) {
        this.ingredients.push(ingredient);
        this.ingredientMeasurements.push({ ingredientId: ingredient.id, parts: result });
      }
    });
  }

  launchEditIngredientMeasurement(ingredient: Ingredient): void {
    const ingredientMeasurement = this.ingredientMeasurements.find(ingredientMeasurement => ingredientMeasurement.ingredientId === ingredient.id);
    if (!ingredientMeasurement) {
      return;
    }

    let dialogHandle = this.dialog.open(IngredientMeasurementDialogComponent, {
      width: '250px',
      data: { name: ingredient.name, parts: ingredientMeasurement.parts }
    });

    dialogHandle.afterClosed().pipe(first()).subscribe((result: number) => {
      if (result) {
        ingredientMeasurement.parts = result;
      }
    });
  }

  onSubmit() {
    const updatedDrink: Drink = {
      id: this.drink.id,
      imageUrl: this.drinkForm.value.imageUrl,
      name: this.drinkForm.value.name,
      description: this.drinkForm.value.description,
      ingredientMeasurements: this.ingredientMeasurements,
      defaultCupId: this.drinkForm.value.defaultCupId,
      starRating: this.drinkForm.value.starRating
    }

    this.dialogRef.close(updatedDrink);
  }
  
  remove(ingredientId: string): void {
    const ingredientToRemoveIndex = this.ingredients.findIndex(ingredient => ingredient.id === ingredientId);
    if (ingredientToRemoveIndex > -1) {
      this.ingredients.splice(ingredientToRemoveIndex, 1);
    }

    const ingredientMeasurementToRemoveIndex = this.ingredientMeasurements.findIndex(ingredientMeasurement => ingredientMeasurement.ingredientId === ingredientId);
    if (ingredientMeasurementToRemoveIndex > -1) {
      this.ingredientMeasurements.splice(ingredientMeasurementToRemoveIndex, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let selectedIngredient = this.allIngredients.find(ingredient => ingredient.id === event.option.value);
    if (!selectedIngredient || this.ingredients.some(ingredient => ingredient.id === selectedIngredient?.id)) {
      return;
    }

    this.ingredientsNameCriteriaInput.nativeElement.value = '';
    this.ingredientNameCriteriaControl.setValue('');
    this.launchAddIngredientMeasurementDialog(selectedIngredient);
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
