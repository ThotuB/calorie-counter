import { Food } from "./food";

export interface Meal {
    id: number;
    user_id: number;
    food: Food;
    meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    portions: number;
    portion_size: 'serving' | 'gram' | 'ml';
    date: string;
}

export interface NewMealDto {
    user_id: number;
    food_id: number;
    meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    portions: number;
    portion_size: 'serving' | 'gram' | 'ml'
    date: string;
}
