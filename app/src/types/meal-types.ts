import { Food } from "./food";
import { Source } from "./source_enum";

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type PortionSize = 'serving' | 'gram' | 'ml';

export interface Meal {
    id: number;
    user_id: string;
    food: Food;
    meal_type: MealType
    date: string;
    portions: number;
    portion_size: PortionSize;
}

export interface CreateMeal {
    user_id: string;
    food: Food;
    meal_type: MealType
    date: string;
    portions: number;
    portion_size: PortionSize;
    source: Source
}