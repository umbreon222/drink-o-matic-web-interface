import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'; 
import { MatCardModule } from '@angular/material/card';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { PumpsComponent } from './pumps/pumps.component';
import { DrinksComponent } from './drinks/drinks.component';
import { DrinkComponent } from './drinks/drink/drink.component';
import { DrinkConfigDialogComponent } from './drinks/drink-config-dialog/drink-config-dialog.component';
import { IngredientComponent } from './ingredients/ingredient/ingredient.component';
import { IngredientConfigDialogComponent } from './ingredients/ingredient-config-dialog/ingredient-config-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    PumpsComponent,
    DrinksComponent,
    DrinkComponent,
    DrinkConfigDialogComponent,
    IngredientComponent,
    IngredientConfigDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
