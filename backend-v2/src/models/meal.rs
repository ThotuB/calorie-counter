// use diesel::prelude::*;
// use diesel_derive_enum::DbEnum;
// use serde::{Deserialize, Serialize};
//
// use crate::schema::meals;
//
// use super::source_enum::Source;
//
// #[derive(DbEnum, Debug, Serialize, Deserialize, PartialEq)]
// #[serde(rename_all = "snake_case")]
// #[ExistingTypePath = "crate::schema::sql_types::MealType"]
// pub enum MealType {
//     Breakfast,
//     Lunch,
//     Dinner,
//     Snack,
// }
//
// #[derive(DbEnum, Debug, Serialize, Deserialize)]
// #[serde(rename_all = "snake_case")]
// #[ExistingTypePath = "crate::schema::sql_types::PortionSize"]
// pub enum PortionSize {
//     Serving,
//     Gram,
//     Ml,
// }
//
// #[derive(Queryable)]
// #[diesel(table_name = meals)]
// pub struct Meal {
//     pub id: i32,
//     pub user_id: String,
//     pub food_id: i32,
//     pub meal_type: MealType,
//     pub date: chrono::NaiveDate,
//     pub portions: f32,
//     pub portion_size: PortionSize,
//     pub calories: i32,
//     pub protein: f32,
//     pub carbs: f32,
//     pub fat: f32,
//     pub source: Source,
// }
//
// #[derive(Insertable, Deserialize)]
// #[diesel(table_name = meals)]
// pub struct NewMeal {
//     pub user_id: String,
//     pub food_id: i32,
//     pub meal_type: MealType,
//     pub date: chrono::NaiveDate,
//     pub portions: f32,
//     pub portion_size: PortionSize,
//     pub calories: i32,
//     pub protein: f32,
//     pub carbs: f32,
//     pub fat: f32,
//     pub source: Source,
// }
