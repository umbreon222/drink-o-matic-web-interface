import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingsService } from 'src/app/settings.service';
import { Ingredient } from 'src/models/ingredient';

@Component({
  selector: 'app-ingredient-config-dialog',
  templateUrl: './ingredient-config-dialog.component.html',
  styleUrls: ['./ingredient-config-dialog.component.scss']
})
export class IngredientConfigDialogComponent implements OnInit {
  ingredientForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<IngredientConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private ingredient: Ingredient,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ingredientForm = this.formBuilder.group({
      name: this.ingredient.name,
      modifier: this.ingredient.modifier
    });
  }

  onSubmit() {
    let { name, modifier } = this.ingredientForm.value;
    const updatedIngredient: Ingredient = {
      id: this.ingredient.id,
      name: name,
      modifier: modifier
    }
    
    this.dialogRef.close(updatedIngredient);
  }
}
