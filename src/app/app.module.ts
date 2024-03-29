import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { PumpsComponent } from './pumps/pumps.component';
import { DrinksComponent } from './drinks/drinks.component';
import { DrinkComponent } from './drinks/drink/drink.component';
import { DrinkConfigDialogComponent } from './drinks/drink-config-dialog/drink-config-dialog.component';
import { IngredientComponent } from './ingredients/ingredient/ingredient.component';
import { IngredientConfigDialogComponent } from './ingredients/ingredient-config-dialog/ingredient-config-dialog.component';
import { PumpConfigDialogComponent } from './pumps/pump-config-dialog/pump-config-dialog.component';
import { PumpComponent } from './pumps/pump/pump.component';
import { ApiService } from './api.service';
import { CupsComponent } from './cups/cups.component';
import { CupComponent } from './cups/cup/cup.component';
import { CupConfigDialogComponent } from './cups/cup-config-dialog/cup-config-dialog.component';
import { ConfirmDefaultCupDialogComponent } from './drinks/confirm-default-cup-dialog/confirm-default-cup-dialog.component';
import { CupPickerDialogComponent } from './drinks/cup-picker-dialog/cup-picker-dialog.component';
import { IngredientMeasurementDialogComponent } from './drinks/ingredient-measurement-dialog/ingredient-measurement-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    PumpsComponent,
    DrinksComponent,
    DrinkComponent,
    DrinkConfigDialogComponent,
    IngredientComponent,
    IngredientConfigDialogComponent,
    PumpConfigDialogComponent,
    PumpComponent,
    CupsComponent,
    CupComponent,
    CupConfigDialogComponent,
    ConfirmDefaultCupDialogComponent,
    CupPickerDialogComponent,
    IngredientMeasurementDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
