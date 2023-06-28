use diesel::prelude::*;
use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

use crate::schema::food;

#[derive(DbEnum, Debug, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[ExistingTypePath = "crate::schema::sql_types::ServingSizeUnit"]
pub enum ServingSizeUnit {
    G,
    Ml,
}

#[derive(Queryable, Serialize)]
#[diesel(table_name = food)]
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

#[derive(Insertable, Deserialize)]
#[diesel(table_name = food)]
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
