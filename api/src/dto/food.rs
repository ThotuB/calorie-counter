use serde::Serialize;

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
