// @generated automatically by Diesel CLI.

pub mod sql_types {
    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "meal_type"))]
    pub struct MealType;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "portion_size"))]
    pub struct PortionSize;
}

diesel::table! {
    favorite_foods (user_id, food_id) {
        user_id -> Int4,
        food_id -> Int4,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::MealType;
    use super::sql_types::PortionSize;

    meals (id) {
        id -> Int4,
        user_id -> Int4,
        food_id -> Int4,
        meal_type -> MealType,
        date -> Date,
        portions -> Float4,
        portion_size -> PortionSize,
    }
}

diesel::table! {
    water (user_id, date) {
        user_id -> Int4,
        date -> Date,
        amount -> Int4,
    }
}

diesel::allow_tables_to_appear_in_same_query!(favorite_foods, meals, water,);
