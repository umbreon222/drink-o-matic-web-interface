import { Cup } from "./cup";
import { Drink } from "./drink";
import { Ingredient } from "./ingredient";
import { Pump } from "./pump";

export class Settings {
    cups: Cup[];
    ingredients: Ingredient[];
    pumps: Pump[];
    drinks: Drink[];
}