use crate::{
    dto::food::{AminoAcids, Food, Minerals, Nutrients, Vitamins},
    services::usda_food::{USDABranndedFoodItemDto, USDAFoodNutrientDto},
};

pub fn usda_food_to_food(food: USDABranndedFoodItemDto) -> Food {
    let nutrients = food.foodNutrients;

    return Food {
        id: food.fdcId,
        name: food.description,
        brand: food.brandName.or(food.brandOwner).unwrap_or("".to_string()),
        calories: get_usda_nutrient_value(&nutrients, 1008).unwrap_or(0.0),
        serving_size: food.servingSize.unwrap_or(100.0),
        serving_size_unit: food.servingSizeUnit.unwrap_or("g".to_string()),
        alternative_serving_size: Some(String::from("1 serving")),
        nutrients: Nutrients {
            carbs: get_usda_nutrient_value(&nutrients, 1005).unwrap_or(0.0),
            fiber: get_usda_nutrient_value(&nutrients, 1079),
            sugar: get_usda_nutrient_value(&nutrients, 2000),
            protein: get_usda_nutrient_value(&nutrients, 1003).unwrap_or(0.0),
            fat: get_usda_nutrient_value(&nutrients, 1004).unwrap_or(0.0),
            saturated_fat: get_usda_nutrient_value(&nutrients, 1258),
            polyunsaturated_fat: get_usda_nutrient_value(&nutrients, 1257),
        },
        vitamins: Some(Vitamins {
            a: get_usda_nutrient_value(&nutrients, 1104),
            b1: get_usda_nutrient_value(&nutrients, 1165),
            b2: get_usda_nutrient_value(&nutrients, 1166),
            b3: get_usda_nutrient_value(&nutrients, 1167),
            b5: get_usda_nutrient_value(&nutrients, 1170),
            b6: get_usda_nutrient_value(&nutrients, 1175),
            b7: get_usda_nutrient_value(&nutrients, 1176),
            b9: get_usda_nutrient_value(&nutrients, 1186),
            b12: get_usda_nutrient_value(&nutrients, 1178),
            c: get_usda_nutrient_value(&nutrients, 1162),
            d: get_usda_nutrient_value(&nutrients, 1110),
            e: get_usda_nutrient_value(&nutrients, 1158),
            k: get_usda_nutrient_value(&nutrients, 1185),
        }),
        minerals: Some(Minerals {
            calcium: get_usda_nutrient_value(&nutrients, 1087),
            iron: get_usda_nutrient_value(&nutrients, 1089),
            magnesium: get_usda_nutrient_value(&nutrients, 1090),
            phosphorus: get_usda_nutrient_value(&nutrients, 1091),
            potassium: get_usda_nutrient_value(&nutrients, 1092),
            sodium: get_usda_nutrient_value(&nutrients, 1093),
            zinc: get_usda_nutrient_value(&nutrients, 1095),
            chromium: get_usda_nutrient_value(&nutrients, 1096),
            copper: get_usda_nutrient_value(&nutrients, 1098),
            iodine: get_usda_nutrient_value(&nutrients, 1100),
            manganese: get_usda_nutrient_value(&nutrients, 1101),
            molybdenum: get_usda_nutrient_value(&nutrients, 1102),
            selenium: get_usda_nutrient_value(&nutrients, 1103),
            chloride: None,
            fluoride: None,
        }),
        amino_acids: Some(AminoAcids {
            alanine: get_usda_nutrient_value(&nutrients, 1222),
            arginine: get_usda_nutrient_value(&nutrients, 1220),
            aspartate: get_usda_nutrient_value(&nutrients, 1223),
            cysteine: get_usda_nutrient_value(&nutrients, 1216),
            glutamate: get_usda_nutrient_value(&nutrients, 1224),
            glycine: get_usda_nutrient_value(&nutrients, 1225),
            histidine: get_usda_nutrient_value(&nutrients, 1221),
            isoleucine: get_usda_nutrient_value(&nutrients, 1212),
            leucine: get_usda_nutrient_value(&nutrients, 1213),
            lysine: get_usda_nutrient_value(&nutrients, 1214),
            methionine: get_usda_nutrient_value(&nutrients, 1215),
            phenylalanine: get_usda_nutrient_value(&nutrients, 1217),
            proline: get_usda_nutrient_value(&nutrients, 1226),
            serine: get_usda_nutrient_value(&nutrients, 1227),
            threonine: get_usda_nutrient_value(&nutrients, 1211),
            tryptophan: get_usda_nutrient_value(&nutrients, 1210),
            tyrosine: get_usda_nutrient_value(&nutrients, 1218),
            valine: get_usda_nutrient_value(&nutrients, 1219),
        }),
    };
}

pub fn get_usda_nutrient_value(
    nutrients: &Vec<USDAFoodNutrientDto>,
    nutrient_id: i32,
) -> Option<f32> {
    if let Some(nutrient) = nutrients
        .iter()
        .find(|n| n.nutrient.id == Some(nutrient_id))
    {
        return nutrient.amount;
    }

    return None;
}
