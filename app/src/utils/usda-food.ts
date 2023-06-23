import { Food } from "src/types/food";
import { AbridgedFoodNutrientDto, FoodDto, FoodNutrientDto, SearchResultFoodDto } from "src/types/usda-food";

const findSearchNutrient = (nutrients: AbridgedFoodNutrientDto[], id: number) => {
    return nutrients.find((nutrient) => nutrient.nutrientId === id);
}

const getSearchNutrientValue = (nutrients: AbridgedFoodNutrientDto[], id: number) => {
    const nutrient = findSearchNutrient(nutrients, id);
    return nutrient?.value || 0;
}

export const usdaSearchFoodToFood = (food: SearchResultFoodDto): Food => {
    return {
        id: food.fdcId,
        name: food.description,
        brand: food.brandName || food.brandOwner,
        calories: getSearchNutrientValue(food.foodNutrients, 1008),
        serving_size: food.servingSize,
        serving_size_unit: food.servingSizeUnit,
        alternative_serving_size: '1 serving',
        verified: true,
        nutrients: {
            carbs: getSearchNutrientValue(food.foodNutrients, 1005),
            fiber: getSearchNutrientValue(food.foodNutrients, 1079),
            sugar: getSearchNutrientValue(food.foodNutrients, 2000),
            protein: getSearchNutrientValue(food.foodNutrients, 1003),
            fat: getSearchNutrientValue(food.foodNutrients, 1004),
            saturated_fat: getSearchNutrientValue(food.foodNutrients, 1258),
            unsaturated_fat: getSearchNutrientValue(food.foodNutrients, 1257),
        },
        vitamins: {
            A: getSearchNutrientValue(food.foodNutrients, 1104),
            B1: getSearchNutrientValue(food.foodNutrients, 1165),
            B2: getSearchNutrientValue(food.foodNutrients, 1166),
            B3: getSearchNutrientValue(food.foodNutrients, 1167),
            B5: getSearchNutrientValue(food.foodNutrients, 1170),
            B6: getSearchNutrientValue(food.foodNutrients, 1175),
            B7: getSearchNutrientValue(food.foodNutrients, 1176),
            B9: getSearchNutrientValue(food.foodNutrients, 1186),
            B12: getSearchNutrientValue(food.foodNutrients, 1178),
            C: getSearchNutrientValue(food.foodNutrients, 1162),
            D: getSearchNutrientValue(food.foodNutrients, 1110),
            E: getSearchNutrientValue(food.foodNutrients, 1158),
            K: getSearchNutrientValue(food.foodNutrients, 1185),
        },
        minerals: {
            calcium: getSearchNutrientValue(food.foodNutrients, 1087),
            iron: getSearchNutrientValue(food.foodNutrients, 1089),
            magnesium: getSearchNutrientValue(food.foodNutrients, 1090),
            phosphorus: getSearchNutrientValue(food.foodNutrients, 1091),
            potassium: getSearchNutrientValue(food.foodNutrients, 1092),
            sodium: getSearchNutrientValue(food.foodNutrients, 1093),
            zinc: getSearchNutrientValue(food.foodNutrients, 1095),
            chromium: getSearchNutrientValue(food.foodNutrients, 1096),
            copper: getSearchNutrientValue(food.foodNutrients, 1098),
            iodine: getSearchNutrientValue(food.foodNutrients, 1100),
            manganese: getSearchNutrientValue(food.foodNutrients, 1101),
            molybdenum: getSearchNutrientValue(food.foodNutrients, 1102),
            selenium: getSearchNutrientValue(food.foodNutrients, 1103),
        },
        amino_acids: {
            alanine: getSearchNutrientValue(food.foodNutrients, 1222),
            arginine: getSearchNutrientValue(food.foodNutrients, 1220),
            aspartate: getSearchNutrientValue(food.foodNutrients, 1223),
            cystine: getSearchNutrientValue(food.foodNutrients, 1216),
            glutamate: getSearchNutrientValue(food.foodNutrients, 1224),
            glycine: getSearchNutrientValue(food.foodNutrients, 1225),
            histidine: getSearchNutrientValue(food.foodNutrients, 1221),
            isoleucine: getSearchNutrientValue(food.foodNutrients, 1212),
            leucine: getSearchNutrientValue(food.foodNutrients, 1213),
            lysine: getSearchNutrientValue(food.foodNutrients, 1214),
            methionine: getSearchNutrientValue(food.foodNutrients, 1215),
            phenylalanine: getSearchNutrientValue(food.foodNutrients, 1217),
            proline: getSearchNutrientValue(food.foodNutrients, 1226),
            serine: getSearchNutrientValue(food.foodNutrients, 1227),
            threonine: getSearchNutrientValue(food.foodNutrients, 1211),
            tryptophan: getSearchNutrientValue(food.foodNutrients, 1210),
            tyrosine: getSearchNutrientValue(food.foodNutrients, 1218),
            valine: getSearchNutrientValue(food.foodNutrients, 1219),
        },
    };
}

const findIdNutrient = (nutrients: FoodNutrientDto[], id: number) => {
    return nutrients.find((nutrient) => nutrient.nutrient.id === id);
}

const getIdNutrientValue = (nutrients: FoodNutrientDto[], id: number) => {
    const nutrient = findIdNutrient(nutrients, id);
    return nutrient ? nutrient.amount : undefined;
}

export const usdaFoodToFood = (food: FoodDto): Food => {
    return {
        id: food.fdcId,
        name: food.description,
        brand: food.brandName || food.brandOwner,
        calories: getIdNutrientValue(food.foodNutrients, 1008) || 0,
        serving_size: food.servingSize,
        serving_size_unit: food.servingSizeUnit,
        alternative_serving_size: '1 serving',
        verified: true,
        nutrients: {
            carbs: getIdNutrientValue(food.foodNutrients, 1005) || 0,
            fiber: getIdNutrientValue(food.foodNutrients, 1079),
            sugar: getIdNutrientValue(food.foodNutrients, 2000),
            protein: getIdNutrientValue(food.foodNutrients, 1003) || 0,
            fat: getIdNutrientValue(food.foodNutrients, 1004) || 0,
            saturated_fat: getIdNutrientValue(food.foodNutrients, 1258),
            unsaturated_fat: getIdNutrientValue(food.foodNutrients, 1257),
        },
        vitamins: {
            A: getIdNutrientValue(food.foodNutrients, 1104),
            B1: getIdNutrientValue(food.foodNutrients, 1165),
            B2: getIdNutrientValue(food.foodNutrients, 1166),
            B3: getIdNutrientValue(food.foodNutrients, 1167),
            B5: getIdNutrientValue(food.foodNutrients, 1170),
            B6: getIdNutrientValue(food.foodNutrients, 1175),
            B7: getIdNutrientValue(food.foodNutrients, 1176),
            B9: getIdNutrientValue(food.foodNutrients, 1186),
            B12: getIdNutrientValue(food.foodNutrients, 1178),
            C: getIdNutrientValue(food.foodNutrients, 1162),
            D: getIdNutrientValue(food.foodNutrients, 1110),
            E: getIdNutrientValue(food.foodNutrients, 1158),
            K: getIdNutrientValue(food.foodNutrients, 1185),
        },
        minerals: {
            calcium: getIdNutrientValue(food.foodNutrients, 1087),
            iron: getIdNutrientValue(food.foodNutrients, 1089),
            magnesium: getIdNutrientValue(food.foodNutrients, 1090),
            phosphorus: getIdNutrientValue(food.foodNutrients, 1091),
            potassium: getIdNutrientValue(food.foodNutrients, 1092),
            sodium: getIdNutrientValue(food.foodNutrients, 1093),
            zinc: getIdNutrientValue(food.foodNutrients, 1095),
            chromium: getIdNutrientValue(food.foodNutrients, 1096),
            copper: getIdNutrientValue(food.foodNutrients, 1098),
            iodine: getIdNutrientValue(food.foodNutrients, 1100),
            manganese: getIdNutrientValue(food.foodNutrients, 1101),
            molybdenum: getIdNutrientValue(food.foodNutrients, 1102),
            selenium: getIdNutrientValue(food.foodNutrients, 1103),
        },
        amino_acids: {
            alanine: getIdNutrientValue(food.foodNutrients, 1222),
            arginine: getIdNutrientValue(food.foodNutrients, 1220),
            aspartate: getIdNutrientValue(food.foodNutrients, 1223),
            cystine: getIdNutrientValue(food.foodNutrients, 1216),
            glutamate: getIdNutrientValue(food.foodNutrients, 1224),
            glycine: getIdNutrientValue(food.foodNutrients, 1225),
            histidine: getIdNutrientValue(food.foodNutrients, 1221),
            isoleucine: getIdNutrientValue(food.foodNutrients, 1212),
            leucine: getIdNutrientValue(food.foodNutrients, 1213),
            lysine: getIdNutrientValue(food.foodNutrients, 1214),
            methionine: getIdNutrientValue(food.foodNutrients, 1215),
            phenylalanine: getIdNutrientValue(food.foodNutrients, 1217),
            proline: getIdNutrientValue(food.foodNutrients, 1226),
            serine: getIdNutrientValue(food.foodNutrients, 1227),
            threonine: getIdNutrientValue(food.foodNutrients, 1211),
            tryptophan: getIdNutrientValue(food.foodNutrients, 1210),
            tyrosine: getIdNutrientValue(food.foodNutrients, 1218),
            valine: getIdNutrientValue(food.foodNutrients, 1219),
        },
    };
}