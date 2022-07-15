import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { MatCardModule } from '@angular/material/card';
import { PumpsComponent } from './pumps/pumps.component';
import { DrinksComponent } from './drinks/drinks.component';
import { DrinkComponent } from './drinks/drink/drink.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    PumpsComponent,
    DrinksComponent,
    DrinkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
