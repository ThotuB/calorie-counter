use serde::Serialize;

use crate::models::meal::{Meal, MealType, PortionSize};

use super::food::Food;

#[derive(Serialize)]
pub struct MealDto {
    pub id: i32,
    pub user_id: String,
    pub food: Food,
    pub meal_type: MealType,
    pub date: chrono::NaiveDate,
    pub portions: f32,
    pub portion_size: PortionSize,
}

impl MealDto {
    pub fn from_meal(meal: Meal, food: Food) -> MealDto {
        MealDto {
            id: meal.id,
            user_id: meal.user_id,
            food: food.clone(),
            meal_type: meal.meal_type,
            date: meal.date,
            portions: meal.portions,
            portion_size: meal.portion_size,
        }
    }
}
