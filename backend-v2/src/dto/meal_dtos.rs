use serde::{Deserialize, Serialize};

use crate::models::{
    enums::Source,
    meal::{Meal, MealType, NewMeal, PortionSize},
};

use super::food_dtos::FoodDto;

#[derive(Serialize)]
pub struct MealDto {
    pub id: i32,
    pub user_id: String,
    pub food: FoodDto,
    pub meal_type: MealType,
    pub date: chrono::NaiveDate,
    pub portions: f32,
    pub portion_size: PortionSize,
}

impl MealDto {
    pub fn from_meal(meal: Meal, food: FoodDto) -> Self {
        Self {
            id: meal.id,
            user_id: meal.user_id,
            food,
            meal_type: meal.meal_type,
            date: meal.date,
            portions: meal.portions,
            portion_size: meal.portion_size,
        }
    }
}

#[derive(Deserialize)]
pub struct CreateMealDto {
    pub user_id: String,
    pub food: FoodDto,
    pub meal_type: MealType,
    pub date: chrono::NaiveDate,
    pub portions: f32,
    pub portion_size: PortionSize,
    pub source: Source,
}

impl From<CreateMealDto> for NewMeal {
    fn from(val: CreateMealDto) -> Self {
        NewMeal {
            user_id: val.user_id,
            food_id: val.food.id,
            meal_type: val.meal_type,
            date: val.date,
            portions: val.portions,
            portion_size: val.portion_size,
            calories: val.food.calories as i32,
            protein: val.food.nutrients.protein,
            carbs: val.food.nutrients.carbs,
            fat: val.food.nutrients.fat,
            source: val.source,
        }
    }
}
