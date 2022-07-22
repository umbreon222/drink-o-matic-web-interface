import { InjectionToken } from '@angular/core';
import { Drink } from "./drink";
import { Ingredient } from "./ingredient";
import { Pump } from "./pump";

export const SETTINGS = new InjectionToken<Settings>('app.settings');

export class Settings {
    ingredients: Ingredient[];
    pumps: Pump[];
    drinks: Drink[];
}