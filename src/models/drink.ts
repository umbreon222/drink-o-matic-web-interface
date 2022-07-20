import { Ingredient } from './ingredient';

export class Drink {
    imageUrl: string;
    name: string;
    description: string;
    ingredients: Ingredient[];
    starRating: number;
}