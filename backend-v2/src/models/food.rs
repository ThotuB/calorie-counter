use serde::{Deserialize, Serialize};

#[derive(Type, Debug, Serialize, Deserialize)]
#[sqlx(type_name = "serving_size_unit", rename_all = "snake_case")]
#[serde(rename_all = "snake_case")]
pub enum ServingSizeUnit {
    G,
    Ml,
}

#[derive(Serialize)]
pub struct Food {
    pub id: i32,
    pub user_id: String,
    pub name: String,
    pub brand: Option<String>,
    pub barcode: Option<i64>,
    pub calories: f32,
    pub carbs: f32,
    pub protein: f32,
    pub fat: f32,
    pub serving_size: f32,
    pub serving_size_unit: ServingSizeUnit,
    pub ingredients: Option<String>,
}

#[derive(Deserialize)]
pub struct NewFood {
    pub user_id: String,
    pub name: String,
    pub brand: Option<String>,
    pub barcode: Option<i64>,
    pub calories: f32,
    pub carbs: f32,
    pub protein: f32,
    pub fat: f32,
    pub serving_size: f32,
    pub serving_size_unit: ServingSizeUnit,
    pub ingredients: Option<String>,
}
