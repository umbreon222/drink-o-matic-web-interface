import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith, first } from 'rxjs/operators';
import { SettingsService } from 'src/app/settings.service';
import { Ingredient } from 'src/models/ingredient';
import { Pump } from 'src/models/pump';

@Component({
  selector: 'app-pump-config-dialog',
  templateUrl: './pump-config-dialog.component.html',
  styleUrls: ['./pump-config-dialog.component.scss']
})
export class PumpConfigDialogComponent implements OnInit {
  @ViewChild('ingredientsNameCriteriaInput')
  ingredientsNameCriteriaInput: ElementRef<HTMLInputElement>;

  pumpForm: FormGroup;
  separatorKeysCodes: number[] = [ ENTER, COMMA ];
  allIngredients: Ingredient[];
  ingredientNameCriteriaControl = new FormControl('');
  ingredients: Ingredient[];
  filteredIngredients: Observable<Ingredient[]>;

  constructor(
    private dialogRef: MatDialogRef<PumpConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private pump: Pump,
    private formBuilder: FormBuilder,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.settingsService.settings$.subscribe(settings => {
      this.allIngredients = settings.ingredients;
      this.ingredients = this.allIngredients.filter(ingredient => this.pump.ingredientId === ingredient.id);
      this.pumpForm = this.formBuilder.group({
        ingredientNameCriteria: this.ingredientNameCriteriaControl
      });

      this.filteredIngredients = this.ingredientNameCriteriaControl.valueChanges.pipe(
        startWith(null),
        map((ingredientName: string | null) => this._filter(ingredientName)),
      );
    });
  }

  onSubmit() {
    const updatedPump: Pump = {
      pumpNumber: this.pump.pumpNumber,
      ingredientId: this.ingredients[0]?.id ?? null
    }

    this.dialogRef.close(updatedPump);
  }
  
  remove(ingredientId: string): void {
    const ingredientToRemoveIndex = this.ingredients.findIndex(ingredient => ingredient.id === ingredientId);
    if (ingredientToRemoveIndex > -1) {
      this.ingredients.splice(ingredientToRemoveIndex, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let selectedIngredient = this.allIngredients.find(ingredient => ingredient.id === event.option.value);
    if (!selectedIngredient || this.ingredients.length > 0) {
      return;
    }

    this.ingredientsNameCriteriaInput.nativeElement.value = '';
    this.ingredientNameCriteriaControl.setValue('');
    this.ingredients.push(selectedIngredient);
  }

  private _filter(value: string | null): Ingredient[] {
    let availableIngredients = this.ingredients.length == 0 ? this.allIngredients : [];
    if (!value) {
      return availableIngredients;
    }
    
    const filterValue = value.toLowerCase();
    return availableIngredients.filter(ingredient => ingredient.name.toLowerCase().includes(filterValue));
  }
}
