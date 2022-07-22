import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IngredientsService } from 'src/app/ingredients/ingredients.service';
import { Drink } from 'src/models/drink';
import { Ingredient } from 'src/models/ingredient';

@Component({
  selector: 'app-drink-config-dialog',
  templateUrl: './drink-config-dialog.component.html',
  styleUrls: ['./drink-config-dialog.component.scss']
})
export class DrinkConfigDialogComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredients: Ingredient[] = [];
  ingredientsCtrl = new FormControl('');
  filteredIngredients: Observable<Ingredient[]>;
  allIngredients: Ingredient[] = [];

  @ViewChild('ingredientsInput') ingredientsInput: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<DrinkConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public drink: Drink,
    private ingredientsService: IngredientsService
  ) {
    this.allIngredients = this.ingredientsService.getIngredients();
    this.ingredients = this.allIngredients.filter(ingredient => this.drink.ingredientIds.includes(ingredient.id));
    this.filteredIngredients = this.ingredientsCtrl.valueChanges.pipe(
      startWith(null),
      map((ingredientName: string | null) => (ingredientName ? this._filter(ingredientName) : this.allIngredients.slice())),
    );
  }

  ngOnInit() {
  }
  
  closeDialog() {
    this.dialogRef.close(this.drink);
  }
  
  remove(ingredientId: string): void {
    this.drink.ingredientIds.splice(this.drink.ingredientIds.indexOf(ingredientId), 1);
    const index = this.ingredients.findIndex(ingredient => ingredient.id === ingredientId);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let selectedIngredient = this.allIngredients.find(ingredient => ingredient.id === event.option.value);
    if (!selectedIngredient || this.drink.ingredientIds.includes(selectedIngredient.id)) {
      return;
    }
    this.drink.ingredientIds.push(selectedIngredient.id);
    this.ingredients.push(selectedIngredient);
    this.ingredientsInput.nativeElement.value = '';
    this.ingredientsCtrl.setValue(null);
  }

  private _filter(value: string): Ingredient[] {
    const filterValue = value.toLowerCase();

    return this.allIngredients.filter(ingredient => ingredient.name.toLowerCase().includes(filterValue));
  }
}
