use std::collections::HashMap;

macro_rules! hashmap {
    () => {
        HashMap::new()
    };

    ($($key:expr => $value:expr),+ $(,)?) => {
        HashMap::from([ $(($key, $value)),* ])
    };
}

pub enum UsdaMicronutrient {
    Nutrient,
    Vitamin,
    Mineral,
    AminoAcid,
}

pub fn get_usda_ids<'a>(micronutrient: UsdaMicronutrient) -> HashMap<&'a str, i32> {
    match micronutrient {
        UsdaMicronutrient::Nutrient => hashmap! {
            "carbs" => 1005,
            "fiber" => 1079,
            "sugar" => 2000,
            "protein" => 1003,
            "fat" => 1004,
            "saturated_fat" => 1258,
            "polyunsaturated_fat" => 1257
        },
        UsdaMicronutrient::Vitamin => hashmap! {
            "a" => 1104,
            "b1" => 1109,
            "b2" => 1110,
            "b3" => 1111,
            "b5" => 1112,
            "b6" => 1113,
            "b7" => 1114,
            "b9" => 1115,
            "b12" => 1116,
            "c" => 1162,
            "d" => 1110,
            "e" => 1158,
            "k" => 1185
        },
        UsdaMicronutrient::Mineral => hashmap! {
            "calcium" => 1087,
            "chloride" => 1093,
            "chromium" => 1098,
            "copper" => 1091,
            "fluoride" => 1099,
            "iodine" => 1100,
            "iron" => 1089,
            "magnesium" => 1090,
            "manganese" => 1101,
            "molybdenum" => 1102,
            "phosphorus" => 1092,
            "potassium" => 1095,
            "selenium" => 1103,
            "sodium" => 1094,
            "zinc" => 1096
        },
        UsdaMicronutrient::AminoAcid => hashmap! {
            "alanine" => 1210,
            "arginine" => 1211,
            "aspartate" => 1212,
            "cysteine" => 1213,
            "glutamate" => 1214,
            "glycine" => 1215,
            "histidine" => 1216,
            "isoleucine" => 1217,
            "leucine" => 1218,
            "lysine" => 1219,
            "methionine" => 1220,
            "phenylalanine" => 1221,
            "proline" => 1222,
            "serine" => 1223,
            "threonine" => 1224,
            "tryptophan" => 1225,
            "tyrosine" => 1226,
            "valine" => 1227
        },
    }
}
