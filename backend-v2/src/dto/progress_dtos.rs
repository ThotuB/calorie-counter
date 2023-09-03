use serde::Serialize;

use crate::{
    models::meal::MealType,
    repos::meal_repo::{MealAveragePerMealType, MealGroup},
};

#[derive(Debug, Serialize)]
pub struct ProgressDto {
    pub average: ProgressTrackedDto,
    pub max: ProgressTrackedDto,
    pub percent_breakfast: f32,
    pub percent_lunch: f32,
    pub percent_dinner: f32,
    pub percent_snack: f32,
    pub days: Vec<ProgressDayDto>,
}

impl ProgressDto {
    pub fn empty() -> Self {
        Self {
            average: ProgressTrackedDto::empty(),
            max: ProgressTrackedDto::empty(),
            percent_breakfast: 0.0,
            percent_lunch: 0.0,
            percent_dinner: 0.0,
            percent_snack: 0.0,
            days: Vec::new(),
        }
    }

    pub fn new(meals: Vec<MealGroup>, averages_per_meal_type: Vec<MealAveragePerMealType>) -> Self {
        Self {
            average: Self::get_avg_per_day(&meals),
            max: Self::get_max_per_day(&meals),
            percent_breakfast: Self::get_percent_meal_type(
                &averages_per_meal_type,
                MealType::Breakfast,
            ),
            percent_lunch: Self::get_percent_meal_type(&averages_per_meal_type, MealType::Lunch),
            percent_dinner: Self::get_percent_meal_type(&averages_per_meal_type, MealType::Dinner),
            percent_snack: Self::get_percent_meal_type(&averages_per_meal_type, MealType::Snack),
            days: meals.into_iter().map(|m| m.into()).collect(),
        }
    }

    fn get_avg_per_day(meals: &Vec<MealGroup>) -> ProgressTrackedDto {
        let total_calories: i32 = meals.iter().map(|m| m.calories.unwrap_or(0)).sum();
        let total_protein: f32 = meals.iter().map(|m| m.protein.unwrap_or(0.0)).sum();
        let total_carbs: f32 = meals.iter().map(|m| m.carbs.unwrap_or(0.0)).sum();
        let total_fat: f32 = meals.iter().map(|m| m.fat.unwrap_or(0.0)).sum();

        ProgressTrackedDto {
            calories: total_calories / meals.len() as i32,
            protein: (total_protein / meals.len() as f32) as i32,
            carbs: (total_carbs / meals.len() as f32) as i32,
            fat: (total_fat / meals.len() as f32) as i32,
            water: 0,
        }
    }

    fn get_max_per_day(meals: &[MealGroup]) -> ProgressTrackedDto {
        let max_calories = meals
            .iter()
            .map(|m| m.calories.unwrap_or(0))
            .max()
            .unwrap_or(0);
        let max_protein = meals
            .iter()
            .map(|m| m.protein.unwrap_or(0.0) as i32)
            .max()
            .unwrap_or(0);
        let max_carbs = meals
            .iter()
            .map(|m| m.carbs.unwrap_or(0.0) as i32)
            .max()
            .unwrap_or(0);
        let max_fat = meals
            .iter()
            .map(|m| m.fat.unwrap_or(0.0) as i32)
            .max()
            .unwrap_or(0);

        ProgressTrackedDto {
            calories: max_calories,
            protein: max_protein,
            carbs: max_carbs,
            fat: max_fat,
            water: 0,
        }
    }

    fn get_percent_meal_type(meal_types: &Vec<MealAveragePerMealType>, meal_type: MealType) -> f32 {
        let total_calories: i32 = meal_types.iter().map(|mt| mt.calories.unwrap_or(0)).sum();

        match meal_types.iter().find(|mt| mt.meal_type == meal_type) {
            Some(mt) => mt.calories.unwrap_or(0) as f32 / total_calories as f32,
            None => 0.0,
        }
    }
}

#[derive(Debug, Serialize)]
pub struct ProgressTrackedDto {
    pub calories: i32,
    pub carbs: i32,
    pub protein: i32,
    pub fat: i32,
    pub water: i32,
}

impl ProgressTrackedDto {
    pub fn empty() -> Self {
        Self {
            calories: 0,
            carbs: 0,
            protein: 0,
            fat: 0,
            water: 0,
        }
    }
}

#[derive(Debug, Serialize)]
pub struct ProgressDayDto {
    pub date: chrono::NaiveDate,
    pub calories: i32,
    pub carbs: i32,
    pub protein: i32,
    pub fat: i32,
    pub water: i32,
}

impl From<MealGroup> for ProgressDayDto {
    fn from(meal: MealGroup) -> Self {
        Self {
            date: meal.date,
            calories: meal.calories.unwrap_or(0),
            carbs: meal.carbs.unwrap_or(0.0) as i32,
            protein: meal.protein.unwrap_or(0.0) as i32,
            fat: meal.fat.unwrap_or(0.0) as i32,
            water: 0,
        }
    }
}
