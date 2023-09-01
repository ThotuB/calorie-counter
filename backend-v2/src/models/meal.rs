use serde::{Deserialize, Serialize};

use super::enums::Source;

#[derive(Type, Debug, Serialize, Deserialize, PartialEq)]
#[sqlx(type_name = "meal_type", rename_all = "snake_case")]
#[serde(rename_all = "snake_case")]
pub enum MealType {
    Breakfast,
    Lunch,
    Dinner,
    Snack,
}

#[derive(Type, Debug, Serialize, Deserialize)]
#[sqlx(type_name = "portion_size", rename_all = "snake_case")]
#[serde(rename_all = "snake_case")]
pub enum PortionSize {
    Serving,
    Gram,
    Ml,
}

pub struct Meal {
    pub id: i32,
    pub user_id: String,
    pub food_id: i32,
    pub meal_type: MealType,
    pub date: chrono::NaiveDate,
    pub portions: f32,
    pub portion_size: PortionSize,
    pub calories: i32,
    pub protein: f32,
    pub carbs: f32,
    pub fat: f32,
    pub source: Source,
}

pub struct NewMeal {
    pub user_id: String,
    pub food_id: i32,
    pub meal_type: MealType,
    pub date: chrono::NaiveDate,
    pub portions: f32,
    pub portion_size: PortionSize,
    pub calories: i32,
    pub protein: f32,
    pub carbs: f32,
    pub fat: f32,
    pub source: Source,
}
