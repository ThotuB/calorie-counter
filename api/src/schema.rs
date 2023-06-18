// @generated automatically by Diesel CLI.

pub mod sql_types {
    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "meal_type"))]
    pub struct MealType;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "portion_size"))]
    pub struct PortionSize;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "system"))]
    pub struct System;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "water_size"))]
    pub struct WaterSize;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "weight_goal"))]
    pub struct WeightGoal;
}

diesel::table! {
    favorite_foods (user_id, food_id) {
        #[max_length = 32]
        user_id -> Varchar,
        food_id -> Int4,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::MealType;
    use super::sql_types::PortionSize;

    meals (id) {
        id -> Int4,
        #[max_length = 32]
        user_id -> Varchar,
        food_id -> Int4,
        meal_type -> MealType,
        date -> Date,
        portions -> Float4,
        portion_size -> PortionSize,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::WeightGoal;
    use super::sql_types::System;
    use super::sql_types::WaterSize;

    settings (user_id) {
        #[max_length = 32]
        user_id -> Varchar,
        weight_goal -> WeightGoal,
        age -> Int4,
        height -> Int4,
        weight -> Int4,
        system -> System,
        water_goal -> Int4,
        water_size -> WaterSize,
    }
}

diesel::table! {
    water (user_id, date) {
        #[max_length = 32]
        user_id -> Varchar,
        date -> Date,
        amount -> Int4,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    favorite_foods,
    meals,
    settings,
    water,
);
