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
            food: food.clone(),
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

impl Into<NewMeal> for CreateMealDto {
    fn into(self) -> NewMeal {
        NewMeal {
            user_id: self.user_id,
            food_id: self.food.id,
            meal_type: self.meal_type,
            date: self.date,
            portions: self.portions,
            portion_size: self.portion_size,
            calories: self.food.calories as i32,
            protein: self.food.nutrients.protein,
            carbs: self.food.nutrients.carbs,
            fat: self.food.nutrients.fat,
            source: self.source,
        }
    }
}
