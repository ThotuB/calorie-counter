use crate::models::food::{Food, NewFood};
use sqlx::{PgPool, Result};

pub async fn get_by_id(conn: &PgPool, id: i32) -> Result<Option<Food>> {
    let food = sqlx::query_as!(
        Food,
        r#"
            SELECT id, user_id, name, brand, barcode, calories, carbs, protein, fat, serving_size, serving_size_unit AS "serving_size_unit: _", ingredients
            FROM food
            WHERE id = $1
        "#,
        id
    )
    .fetch_optional(conn)
    .await?;

    return Ok(food);
}

pub async fn get_by_user(conn: &PgPool, uid: &str) -> Result<Vec<Food>> {
    let foods = sqlx::query_as!(
        Food,
        r#"
            SELECT id, user_id, name, brand, barcode, calories, carbs, protein, fat, serving_size, serving_size_unit AS "serving_size_unit: _", ingredients
            FROM food
            WHERE user_id = $1
        "#,
        uid
    )
    .fetch_all(conn)
    .await?;

    return Ok(foods);
}

pub async fn get_food_by_barcode(conn: &PgPool, barcode: i64) -> Result<Option<Food>> {
    let food = sqlx::query_as!(
        Food,
        r#"
            SELECT id, user_id, name, brand, barcode, calories, carbs, protein, fat, serving_size, serving_size_unit AS "serving_size_unit: _", ingredients
            FROM food
            WHERE barcode = $1
        "#,
        barcode
    )
    .fetch_optional(conn)
    .await?;

    return Ok(food);
}

pub async fn create(conn: &PgPool, new_food: &NewFood) -> Result<()> {
    sqlx::query(
        r#"
            INSERT INTO foods (user_id, name, brand, barcode, calories, carbs, protein, fat, serving_size, serving_size_unit, ingredients)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        "#,
    )
    .bind(&new_food.user_id)
    .bind(&new_food.name)
    .bind(&new_food.brand)
    .bind(&new_food.barcode)
    .bind(&new_food.calories)
    .bind(&new_food.carbs)
    .bind(&new_food.protein)
    .bind(&new_food.fat)
    .bind(&new_food.serving_size)
    .bind(&new_food.serving_size_unit)
    .bind(&new_food.ingredients)
    .execute(conn)
    .await?;

    return Ok(());
}

pub async fn delete(conn: &PgPool, id: i32) -> Result<()> {
    sqlx::query(
        r#"
            DELETE FROM food
            WHERE id = $1
        "#,
    )
    .bind(id)
    .execute(conn)
    .await?;

    return Ok(());
}
