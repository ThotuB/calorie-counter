use sqlx::{PgPool, Result};

use crate::models::{enums::Source, favorite_food::FavoriteFood, food::Food};

pub async fn get_by_user(conn: &PgPool, uid: &str) -> Result<Vec<i32>> {
    struct FoodId {
        food_id: i32,
    }

    let ids = sqlx::query_as!(
        FoodId,
        r#"
        SELECT food_id
        FROM favorite_foods
        WHERE user_id = $1
        "#,
        uid
    )
    .fetch_all(conn)
    .await?
    .into_iter()
    .map(|f| f.food_id)
    .collect();

    Ok(ids)
}

pub async fn get_created_by_user(conn: &PgPool, uid: &str) -> Result<Vec<Food>> {
    let foods = sqlx::query_as!(
        Food,
        r#"
        SELECT id, food.user_id, name, brand, barcode, calories, carbs, protein, fat, serving_size, serving_size_unit AS "serving_size_unit: _", ingredients
        FROM food
        INNER JOIN favorite_foods ON food.id = favorite_foods.food_id
        WHERE favorite_foods.user_id = $1 AND favorite_foods.source = 'user'
        "#,
        uid
    )
    .fetch_all(conn)
    .await?;

    Ok(foods)
}

pub async fn get_ids_by_user_and_source(
    conn: &PgPool,
    uid: &str,
    source: &Source,
) -> Result<Vec<i32>> {
    struct FoodId {
        food_id: i32,
    }

    let ids = sqlx::query_as!(
        FoodId,
        r#"
            SELECT food_id
            FROM favorite_foods
            WHERE user_id = $1 AND source = $2
        "#,
        uid,
        source as &Source
    )
    .fetch_all(conn)
    .await?
    .into_iter()
    .map(|f| f.food_id)
    .collect();

    Ok(ids)
}

pub async fn get(
    conn: &PgPool,
    uid: &str,
    fid: i32,
    source: &Source,
) -> Result<Option<FavoriteFood>> {
    let food = sqlx::query_as!(
        FavoriteFood,
        r#"
            SELECT user_id, food_id, source AS "source: _"
            FROM favorite_foods
            WHERE user_id = $1 AND food_id = $2 AND source = $3
        "#,
        uid,
        fid,
        source as &Source
    )
    .fetch_optional(conn)
    .await?;

    Ok(food)
}

pub async fn delete(conn: &PgPool, uid: &str, fid: i32, source: &Source) -> Result<()> {
    sqlx::query!(
        r#"
            DELETE FROM favorite_foods
            WHERE user_id = $1 AND food_id = $2 AND source = $3
        "#,
        uid,
        fid,
        source as &Source,
    )
    .execute(conn)
    .await?;

    Ok(())
}

pub async fn create(conn: &PgPool, favorite_food: &FavoriteFood) -> Result<()> {
    sqlx::query!(
        r#"
            INSERT INTO favorite_foods (user_id, food_id, source)
            VALUES ($1, $2, $3)
        "#,
        favorite_food.user_id,
        favorite_food.food_id,
        &favorite_food.source as &Source,
    )
    .execute(conn)
    .await?;

    Ok(())
}

// #[cfg(test)]
// mod tests {
//     use super::*;
//
//     fn setup(conn: &PgPool) {
//         create_many(
//             conn,
//             vec![
//                 NewFavoriteFood {
//                     user_id: str::from("test_user1"),
//                     food_id: 1,
//                     source: Source::User,
//                 },
//                 NewFavoriteFood {
//                     user_id: str::from("test_user1"),
//                     food_id: 2,
//                     source: Source::Usda,
//                 },
//                 NewFavoriteFood {
//                     user_id: str::from("test_user2"),
//                     food_id: 3,
//                     source: Source::User,
//                 },
//             ],
//         )
//         .expect("Error creating favorite foods");
//     }
//
//     #[test]
//     fn test_get_by_user_ok() {
//         let mut conn = crate::db::establish_test_connection();
//         setup(&mut conn);
//
//         let result = get_by_user(&mut conn, &str::from("test_user1"))
//             .expect("Error getting favorite foods by user id");
//
//         assert_eq!(result.len(), 2);
//         assert_eq!(result[0], 1);
//         assert_eq!(result[1], 2);
//     }
//
//     #[test]
//     fn test_get_by_user_not_ok() {
//         let mut conn = crate::db::establish_test_connection();
//         setup(&mut conn);
//
//         let result = get_by_user(&mut conn, &str::from("test_user3"))
//             .expect("Error getting favorite foods by user id");
//
//         assert_eq!(result.len(), 0);
//     }
//
//     #[test]
//     fn test_get_by_user_with_usda_source_ok() {
//         let mut conn = crate::db::establish_test_connection();
//         setup(&mut conn);
//
//         let result = get_by_user_with_usda_source(&mut conn, &str::from("test_user1"))
//             .expect("Error getting favorite foods by user id");
//
//         assert_eq!(result.len(), 1);
//         assert_eq!(result[0], 2);
//     }
// }
