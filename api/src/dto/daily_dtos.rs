use serde::Serialize;

use crate::models::{macro_goal::MacroGoal, meal::MealType};

use super::{food_dtos::Food, meal_dtos::MealDto};

#[derive(Serialize, Clone)]
pub struct DailyDto {
    date: chrono::NaiveDate,
    calories: i32,
    calories_goal: i32,
    carbs: i32,
    carbs_goal: i32,
    fat: i32,
    fat_goal: i32,
    protein: i32,
    protein_goal: i32,
    breakfast: DailyMealDto,
    lunch: DailyMealDto,
    dinner: DailyMealDto,
    snack: DailyMealDto,
}

impl DailyDto {
    pub fn empty(date: chrono::NaiveDate, macro_goal: MacroGoal) -> DailyDto {
        DailyDto {
            date,
            calories: 0,
            calories_goal: macro_goal.calories,
            carbs: 0,
            carbs_goal: macro_goal.carbs,
            fat: 0,
            fat_goal: macro_goal.fat,
            protein: 0,
            protein_goal: macro_goal.protein,
            breakfast: DailyMealDto::empty(),
            lunch: DailyMealDto::empty(),
            dinner: DailyMealDto::empty(),
            snack: DailyMealDto::empty(),
        }
    }

    pub fn new(date: chrono::NaiveDate, macro_goal: MacroGoal, meals: Vec<MealDto>) -> DailyDto {
        let mut daily = DailyDto::empty(date, macro_goal);

        for meal in meals {
            daily.calories += meal.food.calories as i32;
            daily.carbs += meal.food.nutrients.carbs as i32;
            daily.fat += meal.food.nutrients.fat as i32;
            daily.protein += meal.food.nutrients.protein as i32;

            match meal.meal_type {
                MealType::Breakfast => daily.breakfast.push(meal.food),
                MealType::Lunch => daily.lunch.push(meal.food),
                MealType::Dinner => daily.dinner.push(meal.food),
                MealType::Snack => daily.snack.push(meal.food),
            }
        }
        daily
    }
}

#[derive(Serialize, Clone)]
pub struct DailyMealDto {
    calories: i32,
    foods: Vec<DailyFoodDto>,
}

impl DailyMealDto {
    pub fn empty() -> DailyMealDto {
        DailyMealDto {
            calories: 0,
            foods: vec![],
        }
    }

    pub fn push(&mut self, food: Food) {
        self.calories += food.calories as i32;
        self.foods.push(DailyFoodDto {
            name: food.name,
            calories: food.calories as i32,
        });
    }
}

#[derive(Serialize, Clone)]
pub struct DailyFoodDto {
    name: String,
    calories: i32,
}
