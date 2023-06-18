import { Meal } from "src/types/meal";

export const daily = (meals: Meal[]) => {
    return meals.reduce((acc, meal) => {
        return {
            calories: acc.calories + meal.food.calories,
            protein: acc.protein + meal.food.nutrients.protein,
            carbs: acc.carbs + meal.food.nutrients.carbs,
            fat: acc.fat + meal.food.nutrients.fat,
        }
    }, {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
    })
}