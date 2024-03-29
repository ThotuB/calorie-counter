// @generated automatically by Diesel CLI.

pub mod sql_types {
    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "gender"))]
    pub struct Gender;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "meal_type"))]
    pub struct MealType;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "portion_size"))]
    pub struct PortionSize;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "serving_size_unit"))]
    pub struct ServingSizeUnit;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "source"))]
    pub struct Source;

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
    use diesel::sql_types::*;
    use super::sql_types::Source;

    favorite_foods (user_id, food_id, source) {
        #[max_length = 32]
        user_id -> Varchar,
        food_id -> Int4,
        source -> Source,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::ServingSizeUnit;

    food (id) {
        id -> Int4,
        #[max_length = 32]
        user_id -> Bpchar,
        #[max_length = 100]
        name -> Varchar,
        #[max_length = 100]
        brand -> Nullable<Varchar>,
        barcode -> Nullable<Int8>,
        calories -> Float4,
        carbs -> Float4,
        protein -> Float4,
        fat -> Float4,
        serving_size -> Float4,
        serving_size_unit -> ServingSizeUnit,
        ingredients -> Nullable<Text>,
    }
}

diesel::table! {
    macro_goals (user_id) {
        #[max_length = 32]
        user_id -> Varchar,
        calories -> Int4,
        carbs -> Int4,
        protein -> Int4,
        fat -> Int4,
        percent_carbs -> Float4,
        percent_protein -> Float4,
        percent_fat -> Float4,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::MealType;
    use super::sql_types::PortionSize;
    use super::sql_types::Source;

    meals (id) {
        id -> Int4,
        #[max_length = 32]
        user_id -> Varchar,
        food_id -> Int4,
        meal_type -> MealType,
        date -> Date,
        portions -> Float4,
        portion_size -> PortionSize,
        calories -> Int4,
        carbs -> Float4,
        protein -> Float4,
        fat -> Float4,
        source -> Source,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::WeightGoal;
    use super::sql_types::Gender;
    use super::sql_types::System;
    use super::sql_types::WaterSize;

    settings (user_id) {
        #[max_length = 32]
        user_id -> Varchar,
        weight_goal -> WeightGoal,
        gender -> Gender,
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
    food,
    macro_goals,
    meals,
    settings,
    water,
);
