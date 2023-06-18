import { Food } from "./food";

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type PortionSize = 'serving' | 'gram' | 'ml';

export interface Meal {
    id: number;
    user_id: string;
    food: Food;
    meal_type: MealType
    portions: number;
    portion_size: PortionSize;
    date: string;
}

export interface NewMealDto {
    user_id: string;
    food_id: number;
    meal_type: MealType
    portions: number;
    portion_size: PortionSize
    date: string;
}
