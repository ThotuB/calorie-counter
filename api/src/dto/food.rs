use serde::Serialize;

use crate::services::usda_food::{USDABranndedFoodItemDto, USDAFoodNutrientDto};

#[derive(Serialize, Clone)]
pub struct Food {
    pub id: i32,
    pub name: String,
    pub brand: String,
    pub calories: f32,
    pub serving_size: f32,
    pub serving_size_unit: String,
    pub alternative_serving_size: Option<String>,
    pub nutrients: Nutrients,
    pub vitamins: Option<Vitamins>,
    pub minerals: Option<Minerals>,
    pub amino_acids: Option<AminoAcids>,
}

impl Food {
    pub fn from_usda_food(food: USDABranndedFoodItemDto) -> Food {
        let nutrients = food.foodNutrients;

        Food {
            id: food.fdcId,
            name: food.description,
            brand: food.brandName.or(food.brandOwner).unwrap_or("".to_string()),
            calories: get_usda_nutrient_value(&nutrients, 1008).unwrap_or(0.0),
            serving_size: food.servingSize.unwrap_or(100.0),
            serving_size_unit: food.servingSizeUnit.unwrap_or("g".to_string()),
            alternative_serving_size: Some(String::from("1 serving")),
            nutrients: Nutrients::from_usda(&nutrients),
            vitamins: Some(Vitamins::from_usda(&nutrients)),
            minerals: Some(Minerals::from_usda(&nutrients)),
            amino_acids: Some(AminoAcids::from_usda(&nutrients)),
        }
    }
}

#[derive(Serialize, Clone)]
pub struct Nutrients {
    pub protein: f32,
    pub carbs: f32,
    pub sugar: Option<f32>,
    pub fiber: Option<f32>,
    pub fat: f32,
    pub saturated_fat: Option<f32>,
    pub polyunsaturated_fat: Option<f32>,
}

impl Nutrients {
    pub fn from_usda(nutrients: &Vec<USDAFoodNutrientDto>) -> Nutrients {
        Nutrients {
            carbs: get_usda_nutrient_value(&nutrients, 1005).unwrap_or(0.0),
            fiber: get_usda_nutrient_value(&nutrients, 1079),
            sugar: get_usda_nutrient_value(&nutrients, 2000),
            protein: get_usda_nutrient_value(&nutrients, 1003).unwrap_or(0.0),
            fat: get_usda_nutrient_value(&nutrients, 1004).unwrap_or(0.0),
            saturated_fat: get_usda_nutrient_value(&nutrients, 1258),
            polyunsaturated_fat: get_usda_nutrient_value(&nutrients, 1257),
        }
    }
}

#[derive(Serialize, Clone)]
pub struct Vitamins {
    pub a: Option<f32>,
    pub b1: Option<f32>,
    pub b2: Option<f32>,
    pub b3: Option<f32>,
    pub b5: Option<f32>,
    pub b6: Option<f32>,
    pub b7: Option<f32>,
    pub b9: Option<f32>,
    pub b12: Option<f32>,
    pub c: Option<f32>,
    pub d: Option<f32>,
    pub e: Option<f32>,
    pub k: Option<f32>,
}

impl Vitamins {
    pub fn from_usda(nutrients: &Vec<USDAFoodNutrientDto>) -> Vitamins {
        Vitamins {
            a: get_usda_nutrient_value(&nutrients, 1104),
            b1: get_usda_nutrient_value(&nutrients, 1109),
            b2: get_usda_nutrient_value(&nutrients, 1110),
            b3: get_usda_nutrient_value(&nutrients, 1111),
            b5: get_usda_nutrient_value(&nutrients, 1112),
            b6: get_usda_nutrient_value(&nutrients, 1113),
            b7: get_usda_nutrient_value(&nutrients, 1114),
            b9: get_usda_nutrient_value(&nutrients, 1115),
            b12: get_usda_nutrient_value(&nutrients, 1116),
            c: get_usda_nutrient_value(&nutrients, 1162),
            d: get_usda_nutrient_value(&nutrients, 1110),
            e: get_usda_nutrient_value(&nutrients, 1158),
            k: get_usda_nutrient_value(&nutrients, 1185),
        }
    }
}

#[derive(Serialize, Clone)]
pub struct Minerals {
    pub calcium: Option<f32>,
    pub chloride: Option<f32>,
    pub chromium: Option<f32>,
    pub copper: Option<f32>,
    pub fluoride: Option<f32>,
    pub iodine: Option<f32>,
    pub iron: Option<f32>,
    pub magnesium: Option<f32>,
    pub manganese: Option<f32>,
    pub molybdenum: Option<f32>,
    pub phosphorus: Option<f32>,
    pub potassium: Option<f32>,
    pub selenium: Option<f32>,
    pub sodium: Option<f32>,
    pub zinc: Option<f32>,
}

impl Minerals {
    pub fn from_usda(nutrients: &Vec<USDAFoodNutrientDto>) -> Minerals {
        Minerals {
            calcium: get_usda_nutrient_value(&nutrients, 1087),
            chloride: get_usda_nutrient_value(&nutrients, 1093),
            chromium: get_usda_nutrient_value(&nutrients, 1098),
            copper: get_usda_nutrient_value(&nutrients, 1091),
            fluoride: get_usda_nutrient_value(&nutrients, 1099),
            iodine: get_usda_nutrient_value(&nutrients, 1100),
            iron: get_usda_nutrient_value(&nutrients, 1089),
            magnesium: get_usda_nutrient_value(&nutrients, 1090),
            manganese: get_usda_nutrient_value(&nutrients, 1101),
            molybdenum: get_usda_nutrient_value(&nutrients, 1102),
            phosphorus: get_usda_nutrient_value(&nutrients, 1092),
            potassium: get_usda_nutrient_value(&nutrients, 1095),
            selenium: get_usda_nutrient_value(&nutrients, 1103),
            sodium: get_usda_nutrient_value(&nutrients, 1094),
            zinc: get_usda_nutrient_value(&nutrients, 1096),
        }
    }
}

#[derive(Serialize, Clone)]
pub struct AminoAcids {
    pub alanine: Option<f32>,
    pub arginine: Option<f32>,
    pub aspartate: Option<f32>,
    pub cysteine: Option<f32>,
    pub glutamate: Option<f32>,
    pub glycine: Option<f32>,
    pub histidine: Option<f32>,
    pub isoleucine: Option<f32>,
    pub leucine: Option<f32>,
    pub lysine: Option<f32>,
    pub methionine: Option<f32>,
    pub phenylalanine: Option<f32>,
    pub proline: Option<f32>,
    pub serine: Option<f32>,
    pub threonine: Option<f32>,
    pub tryptophan: Option<f32>,
    pub tyrosine: Option<f32>,
    pub valine: Option<f32>,
}

impl AminoAcids {
    pub fn from_usda(nutrients: &Vec<USDAFoodNutrientDto>) -> AminoAcids {
        AminoAcids {
            alanine: get_usda_nutrient_value(&nutrients, 1210),
            arginine: get_usda_nutrient_value(&nutrients, 1211),
            aspartate: get_usda_nutrient_value(&nutrients, 1212),
            cysteine: get_usda_nutrient_value(&nutrients, 1213),
            glutamate: get_usda_nutrient_value(&nutrients, 1214),
            glycine: get_usda_nutrient_value(&nutrients, 1215),
            histidine: get_usda_nutrient_value(&nutrients, 1216),
            isoleucine: get_usda_nutrient_value(&nutrients, 1217),
            leucine: get_usda_nutrient_value(&nutrients, 1218),
            lysine: get_usda_nutrient_value(&nutrients, 1219),
            methionine: get_usda_nutrient_value(&nutrients, 1220),
            phenylalanine: get_usda_nutrient_value(&nutrients, 1221),
            proline: get_usda_nutrient_value(&nutrients, 1222),
            serine: get_usda_nutrient_value(&nutrients, 1223),
            threonine: get_usda_nutrient_value(&nutrients, 1224),
            tryptophan: get_usda_nutrient_value(&nutrients, 1225),
            tyrosine: get_usda_nutrient_value(&nutrients, 1226),
            valine: get_usda_nutrient_value(&nutrients, 1227),
        }
    }
}

fn get_usda_nutrient_value(nutrients: &Vec<USDAFoodNutrientDto>, nutrient_id: i32) -> Option<f32> {
    if let Some(nutrient) = nutrients
        .iter()
        .find(|n| n.nutrient.id == Some(nutrient_id))
    {
        return nutrient.amount;
    }

    return None;
}
