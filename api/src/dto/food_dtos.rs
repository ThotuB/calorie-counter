use std::collections::HashMap;

use serde::{Deserialize, Serialize};

use crate::{
    constants::usda_ids::{get_usda_ids, UsdaMicronutrient},
    services::usda_food::{USDABranndedFoodItemDto, USDAFoodNutrientDto},
};

#[derive(Serialize, Deserialize, Clone)]
pub struct Food {
    pub id: i32,
    pub name: String,
    pub brand: String,
    pub calories: f32,
    pub serving_size: f32,
    pub serving_size_unit: String,
    pub alternative_serving_size: Option<String>,
    pub verified: bool,
    pub nutrients: Nutrients,
    pub vitamins: HashMap<String, f32>,
    pub minerals: HashMap<String, f32>,
    pub amino_acids: HashMap<String, f32>,
}

impl Food {
    pub fn from_usda_food(food: USDABranndedFoodItemDto) -> Food {
        let nutrients = food.food_nutrients;

        Food {
            id: food.fdc_id,
            name: food.description,
            brand: food
                .brand_name
                .or(food.brand_owner)
                .unwrap_or("".to_string()),
            calories: get_micronutrient_value(&nutrients, 1008).unwrap_or(0.0),
            serving_size: food.serving_size.unwrap_or(100.0),
            serving_size_unit: food.serving_size_unit.unwrap_or("g".to_string()),
            alternative_serving_size: Some(String::from("1 serving")),
            verified: true,
            nutrients: Nutrients::from_usda(&nutrients),
            vitamins: get_micronutrients(&nutrients, get_usda_ids(UsdaMicronutrient::Vitamin)),
            minerals: get_micronutrients(&nutrients, get_usda_ids(UsdaMicronutrient::Mineral)),
            amino_acids: get_micronutrients(&nutrients, get_usda_ids(UsdaMicronutrient::AminoAcid)),
        }
    }
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Nutrients {
    pub carbs: f32,
    pub fiber: Option<f32>,
    pub sugar: Option<f32>,
    pub protein: f32,
    pub fat: f32,
    pub saturated_fat: Option<f32>,
    pub unsaturated_fat: Option<f32>,
}

impl Nutrients {
    pub fn empty() -> Nutrients {
        Nutrients {
            protein: 0.0,
            carbs: 0.0,
            sugar: None,
            fiber: None,
            fat: 0.0,
            saturated_fat: None,
            unsaturated_fat: None,
        }
    }

    pub fn from_usda(nutrients: &Vec<USDAFoodNutrientDto>) -> Nutrients {
        Nutrients {
            carbs: get_micronutrient_value(&nutrients, 1005).unwrap_or(0.0),
            fiber: get_micronutrient_value(&nutrients, 1079),
            sugar: get_micronutrient_value(&nutrients, 2000),
            protein: get_micronutrient_value(&nutrients, 1003).unwrap_or(0.0),
            fat: get_micronutrient_value(&nutrients, 1004).unwrap_or(0.0),
            saturated_fat: get_micronutrient_value(&nutrients, 1258),
            unsaturated_fat: get_micronutrient_value(&nutrients, 1257),
        }
    }
}

fn get_micronutrient_value(nutrients: &Vec<USDAFoodNutrientDto>, nutrient_id: i32) -> Option<f32> {
    if let Some(nutrient) = nutrients
        .iter()
        .find(|n| n.nutrient.id == Some(nutrient_id))
    {
        return nutrient.amount;
    }

    return None;
}

fn get_micronutrients(
    nutrients: &Vec<USDAFoodNutrientDto>,
    nutrients_name_id: HashMap<&str, i32>,
) -> HashMap<String, f32> {
    let mut result = HashMap::new();

    for (name, id) in nutrients_name_id {
        if let Some(amount) = get_micronutrient_value(nutrients, id) {
            result.insert(name.to_string(), amount);
        }
    }

    return result;
}