import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinksComponent } from './drinks/drinks.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { PumpsComponent } from './pumps/pumps.component';

const routes: Routes = [
  {
    path: '',
    component: DrinksComponent,
  },
  {
    path: 'drinks',
    component: DrinksComponent,
  },
  {
    path: 'pumps',
    component: PumpsComponent,
  },
  {
    path: 'ingredients',
    component: IngredientsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
