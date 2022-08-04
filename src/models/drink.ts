import { IngredientMeasurement } from "./ingredient-measurement";

export interface Drink {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    ingredientMeasurements: IngredientMeasurement[];
    defaultCupId: string;
    starRating: number;
}