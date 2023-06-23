export interface DailyDto {
    date: string,
    calories: number,
    calories_goal: number,
    carbs: number,
    carbs_goal: number,
    fat: number,
    fat_goal: number,
    protein: number,
    protein_goal: number,
    breakfast: DailyMealDto,
    lunch: DailyMealDto,
    dinner: DailyMealDto,
    snack: DailyMealDto,
}

export interface DailyMealDto {
    calories: number,
    foods: DailyFoodDto[],
}

export interface DailyFoodDto {
    name: string,
    calories: number,
}