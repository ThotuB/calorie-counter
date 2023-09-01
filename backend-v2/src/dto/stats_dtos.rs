use std::collections::HashMap;

use serde::Serialize;

use crate::models::macro_goal::MacroGoal;

use super::food_dtos::{FoodDto, NutrientsDto};

#[derive(Serialize)]
pub struct StatsDto {
    pub date: chrono::NaiveDate,
    pub calories: i32,
    pub calories_goal: i32,
    pub carbs_goal: i32,
    pub fat_goal: i32,
    pub protein_goal: i32,
    pub goal_percentages: StatsMacroPercentagesDto,
    pub intake_percentages: StatsMacroPercentagesDto,
    pub calories_last_week: [i32; 7],
    pub nutrients: NutrientsDto,
    pub vitamins: HashMap<String, f32>,
    pub minerals: HashMap<String, f32>,
    pub amino_acids: HashMap<String, f32>,
}

impl StatsDto {
    pub fn empty(
        date: chrono::NaiveDate,
        macro_goal: &MacroGoal,
        calories_last_week: [i32; 7],
    ) -> Self {
        Self {
            date,
            calories: 0,
            calories_goal: macro_goal.calories,
            carbs_goal: macro_goal.carbs,
            fat_goal: macro_goal.fat,
            protein_goal: macro_goal.protein,
            goal_percentages: StatsMacroPercentagesDto::new(
                macro_goal.percent_carbs,
                macro_goal.percent_fat,
                macro_goal.percent_protein,
            ),
            intake_percentages: StatsMacroPercentagesDto::empty(),
            calories_last_week: calories_last_week,
            nutrients: NutrientsDto::empty(),
            vitamins: HashMap::new(),
            minerals: HashMap::new(),
            amino_acids: HashMap::new(),
        }
    }

    pub fn new(
        date: chrono::NaiveDate,
        macro_goal: &MacroGoal,
        foods: Vec<FoodDto>,
        calories_last_week: [i32; 7],
    ) -> Self {
        let mut stats = Self::empty(date, macro_goal, calories_last_week);

        let mut sugar = 0.0;
        let mut fiber = 0.0;
        let mut saturated_fat = 0.0;
        let mut unsaturated_fat = 0.0;

        for food in foods {
            stats.calories += food.calories as i32;
            stats.nutrients.carbs += food.nutrients.carbs;
            stats.nutrients.protein += food.nutrients.protein;
            stats.nutrients.fat += food.nutrients.fat;

            sugar += food.nutrients.sugar.unwrap_or(0.0);
            fiber += food.nutrients.fiber.unwrap_or(0.0);
            saturated_fat += food.nutrients.saturated_fat.unwrap_or(0.0);
            unsaturated_fat += food.nutrients.unsaturated_fat.unwrap_or(0.0);

            for (vitamin, amount) in food.vitamins {
                *stats.vitamins.entry(vitamin).or_insert(0.0) += amount;
            }
            for (mineral, amount) in food.minerals {
                *stats.minerals.entry(mineral).or_insert(0.0) += amount;
            }
            for (amino_acid, amount) in food.amino_acids {
                *stats.amino_acids.entry(amino_acid).or_insert(0.0) += amount;
            }
        }

        if stats.calories > 0 {
            stats.intake_percentages.carbs = stats.nutrients.carbs / stats.calories as f32;
            stats.intake_percentages.protein = stats.nutrients.protein / stats.calories as f32;
            stats.intake_percentages.fat = stats.nutrients.fat / stats.calories as f32;
        }

        if sugar > 0.0 {
            stats.nutrients.sugar = Some(sugar);
        }
        if fiber > 0.0 {
            stats.nutrients.fiber = Some(fiber);
        }
        if saturated_fat > 0.0 {
            stats.nutrients.saturated_fat = Some(saturated_fat);
        }
        if unsaturated_fat > 0.0 {
            stats.nutrients.unsaturated_fat = Some(unsaturated_fat);
        }

        stats
    }
}

#[derive(Serialize)]
pub struct StatsMacroPercentagesDto {
    pub carbs: f32,
    pub fat: f32,
    pub protein: f32,
}

impl StatsMacroPercentagesDto {
    pub fn empty() -> Self {
        Self {
            carbs: 0.0,
            fat: 0.0,
            protein: 0.0,
        }
    }

    pub fn new(carbs: f32, fat: f32, protein: f32) -> Self {
        Self {
            carbs,
            fat,
            protein,
        }
    }
}
