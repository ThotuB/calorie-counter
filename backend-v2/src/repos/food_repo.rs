use crate::models::food::{Food, NewFood, ServingSizeUnit};
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

    Ok(food)
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

    Ok(foods)
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

    Ok(food)
}

pub async fn create(conn: &PgPool, new_food: &NewFood) -> Result<()> {
    sqlx::query!(
        r#"
            INSERT INTO food (user_id, name, brand, barcode, calories, carbs, protein, fat, serving_size, serving_size_unit, ingredients)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        "#,
        &new_food.user_id,
        &new_food.name,
        new_food.brand,
        new_food.barcode,
        new_food.calories,
        new_food.carbs,
        new_food.protein,
        new_food.fat,
        new_food.serving_size,
        &new_food.serving_size_unit as &ServingSizeUnit,
        new_food.ingredients
    )
    .execute(conn)
    .await?;

    Ok(())
}

pub async fn delete(conn: &PgPool, id: i32) -> Result<()> {
    sqlx::query!(
        r#"
            DELETE FROM food
            WHERE id = $1
        "#,
        id
    )
    .execute(conn)
    .await?;

    Ok(())
}
