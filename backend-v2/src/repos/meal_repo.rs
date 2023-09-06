use sqlx::{PgPool, Result};

use crate::models::{
    enums::Source,
    meal::{Meal, MealType, NewMeal, PortionSize},
};

pub async fn get_by_id(conn: &PgPool, mid: i32) -> Result<Option<Meal>> {
    let meal = sqlx::query_as!(
        Meal,
        r#"
        SELECT id, user_id, food_id, meal_type AS "meal_type: _", date, portions, portion_size AS "portion_size: _", calories, protein, carbs, fat, source AS "source: _"
        FROM meals 
        WHERE id = $1
        "#,
        mid
    )
    .fetch_optional(conn)
    .await?;

    Ok(meal)
}

pub async fn get_by_user(conn: &PgPool, uid: &str) -> Result<Vec<Meal>> {
    let meals = sqlx::query_as!(
        Meal,
        r#"
        SELECT id, user_id, food_id, meal_type AS "meal_type: _", date, portions, portion_size AS "portion_size: _", calories, protein, carbs, fat, source AS "source: _"
        FROM meals 
        WHERE user_id = $1
        "#,
        uid
    )
    .fetch_all(conn)
    .await?;

    Ok(meals)
}

pub async fn get_food_ids_by_user_and_date(
    conn: &PgPool,
    uid: &str,
    date: chrono::NaiveDate,
) -> Result<Vec<i32>> {
    struct FoodId {
        food_id: i32,
    }

    let food_ids = sqlx::query_as!(
        FoodId,
        r#"
        SELECT food_id
        FROM meals 
        WHERE user_id = $1 AND date = $2
        "#,
        uid,
        date
    )
    .fetch_all(conn)
    .await?
    .iter()
    .map(|row| row.food_id)
    .collect::<Vec<i32>>();

    Ok(food_ids)
}

pub async fn get_by_user_and_date(
    conn: &PgPool,
    uid: &str,
    date: chrono::NaiveDate,
) -> Result<Vec<Meal>> {
    let meals = sqlx::query_as!(
        Meal,
        r#"
        SELECT id, user_id, food_id, meal_type AS "meal_type: _", date, portions, portion_size AS "portion_size: _", calories, protein, carbs, fat, source AS "source: _"
        FROM meals 
        WHERE user_id = $1 AND date = $2
        "#,
        uid,
        date
    )
    .fetch_all(conn)
    .await?;

    Ok(meals)
}

pub async fn get_recent(conn: &PgPool, uid: &str) -> Result<Vec<Meal>> {
    let meals = sqlx::query_as!(
        Meal,
        r#"
        SELECT id, user_id, food_id, meal_type AS "meal_type: _", date, portions, portion_size AS "portion_size: _", calories, protein, carbs, fat, source AS "source: _"
        FROM meals 
        WHERE user_id = $1
        ORDER BY date DESC
        LIMIT 10
        "#,
        uid
    )
    .fetch_all(conn)
    .await?;

    Ok(meals)
}

pub async fn get_total_macro_intake_per_day_between_dates_for_user(
    conn: &PgPool,
    uid: &str,
    start_date: &chrono::NaiveDate,
    end_date: &chrono::NaiveDate,
) -> Result<Vec<MealGroup>> {
    let meals = sqlx::query_as!(
        MealGroup,
        r#"
        SELECT date, CAST(SUM(calories) AS INTEGER) AS calories, SUM(protein) AS protein, SUM(carbs) AS carbs, SUM(fat) AS fat
        FROM meals 
        WHERE user_id = $1 AND date >= $2 AND date <= $3
        GROUP BY date
        ORDER BY date ASC
        "#,
        uid,
        start_date,
        end_date
    )
    .fetch_all(conn)
    .await?;

    Ok(meals)
}

pub async fn get_average_macro_intake_per_meal_type_between_dates_for_user(
    conn: &PgPool,
    uid: &str,
    start_date: &chrono::NaiveDate,
    end_date: &chrono::NaiveDate,
) -> Result<Vec<MealAveragePerMealType>> {
    let meals = sqlx::query_as!(
        MealAveragePerMealType,
        r#"
        SELECT meal_type AS "meal_type: _", CAST(AVG(calories) AS INTEGER) AS calories, CAST(AVG(protein) AS REAL) AS protein, CAST(AVG(carbs) AS REAL) AS carbs, CAST(AVG(fat) AS REAL) AS fat
        FROM meals 
        WHERE user_id = $1 AND date >= $2 AND date <= $3
        GROUP BY meal_type
        "#,
        uid,
        start_date,
        end_date
    )
    .fetch_all(conn)
    .await?;

    Ok(meals)
}

pub async fn get_averages_by_user_id_between_dates(
    conn: &PgPool,
    uid: &str,
    start_date: &chrono::NaiveDate,
    end_date: &chrono::NaiveDate,
) -> Result<Option<MealAverage>> {
    // return meals::table
    //     .filter(meals::user_id.eq(uid))
    //     .filter(meals::date.ge(start_date))
    //     .filter(meals::date.le(end_date))
    //     .group_by(meals::date)
    //     .select((
    //         sql::<sql_types::Integer>("CAST(SUM(calories) AS INTEGER)"),
    //         sql::<sql_types::Float>("CAST(SUM(protein) AS REAL)"),
    //         sql::<sql_types::Float>("CAST(SUM(carbs) AS REAL)"),
    //         sql::<sql_types::Float>("CAST(SUM(fat) AS REAL)"),
    //     ))
    //     .select((
    //         sql::<sql_types::Integer>("CAST(AVG(calories) AS INTEGER)"),
    //         sql::<sql_types::Float>("CAST(AVG(protein) AS REAL)"),
    //         sql::<sql_types::Float>("CAST(AVG(carbs) AS REAL)"),
    //         sql::<sql_types::Float>("CAST(AVG(fat) AS REAL)"),
    //     ))
    //     .first::<MealAverage>(conn)
    //     .optional();

    let meal = sqlx::query_as!(
        MealAverage,
        r#"
        SELECT CAST(AVG(calories) AS INTEGER) AS calories, CAST(AVG(protein) AS REAL) AS protein, CAST(AVG(carbs) AS REAL) AS carbs, CAST(AVG(fat) AS REAL) AS fat
        FROM meals 
        WHERE user_id = $1 AND date >= $2 AND date <= $3
        "#,
        uid,
        start_date,
        end_date
    )
    .fetch_optional(conn)
    .await?;

    Ok(meal)
}

pub async fn delete(conn: &PgPool, mid: i32) -> Result<()> {
    let _result = sqlx::query!(
        r#"
        DELETE FROM meals 
        WHERE id = $1
        "#,
        mid
    )
    .execute(conn)
    .await?;

    Ok(())
}

pub async fn create(conn: &PgPool, meal: &NewMeal) -> Result<()> {
    let _meal = sqlx::query!(
        r#"
        INSERT INTO meals (user_id, food_id, meal_type, date, portions, portion_size, calories, protein, carbs, fat, source)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        "#,
        meal.user_id,
        meal.food_id,
        &meal.meal_type as &MealType,
        meal.date,
        meal.portions,
        &meal.portion_size as &PortionSize,
        meal.calories,
        meal.protein,
        meal.carbs,
        meal.fat,
        &meal.source as &Source
    )
    .execute(conn)
    .await?;

    Ok(())
}

pub struct MealGroup {
    pub date: chrono::NaiveDate,
    pub calories: Option<i32>,
    pub protein: Option<f32>,
    pub carbs: Option<f32>,
    pub fat: Option<f32>,
}

pub struct MealAveragePerMealType {
    pub meal_type: MealType,
    pub calories: Option<i32>,
    pub protein: Option<f32>,
    pub carbs: Option<f32>,
    pub fat: Option<f32>,
}

pub struct MealAverage {
    pub calories: Option<i32>,
    pub protein: Option<f32>,
    pub carbs: Option<f32>,
    pub fat: Option<f32>,
}
