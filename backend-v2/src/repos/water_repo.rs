use sqlx::{PgConnection, Result};

use crate::models::water::{Water, WaterAmount, WaterAverage};

pub async fn get_by_user_and_date(
    conn: &mut PgConnection,
    uid: &str,
    day: chrono::NaiveDate,
) -> Result<i32> {
    let amount: i32 = sqlx::query_as::<_, WaterAmount>(
        r"
            SELECT amount
            FROM water
            WHERE user_id = $1 AND date = $2
        ",
    )
    .bind(uid)
    .bind(day)
    .fetch_optional(conn)
    .await?
    .unwrap_or(WaterAmount { amount: 0 })
    .amount;

    return Ok(amount);
}

pub async fn get_by_user(conn: &mut PgConnection, uid: &str) -> Result<Vec<Water>> {
    return sqlx::query_as::<_, Water>(
        r"
            SELECT user_id, date, amount
            FROM water
            WHERE user_id = $1
        ",
    )
    .bind(uid)
    .fetch_all(conn)
    .await;
}

pub async fn get_by_user_between_dates(
    conn: &mut PgConnection,
    uid: &str,
    start: chrono::NaiveDate,
    end: chrono::NaiveDate,
) -> Result<Vec<Water>> {
    return sqlx::query_as::<_, Water>(
        r"
            SELECT user_id, date, amount
            FROM water
            WHERE user_id = $1 AND date >= $2 AND date <= $3
        ",
    )
    .bind(uid)
    .bind(start)
    .bind(end)
    .fetch_all(conn)
    .await;
}

pub async fn get_average_amount_by_user_between_dates(
    conn: &mut PgConnection,
    uid: &str,
    start_date: &chrono::NaiveDate,
    end_date: &chrono::NaiveDate,
) -> Result<f32> {
    return Ok(sqlx::query_as::<_, WaterAverage>(
        r"
            SELECT CAST(AVG(amount) AS REAL) AS amount
            FROM water
            WHERE user_id = $1 AND date >= $2 AND date <= $3
        ",
    )
    .bind(uid)
    .bind(start_date)
    .bind(end_date)
    .fetch_optional(conn)
    .await?
    .unwrap_or(WaterAverage { amount: 0.0 })
    .amount);
}

pub async fn update(conn: &mut PgConnection, updated_water: Water) -> Result<()> {
    sqlx::query(
        r"
            UPDATE water
            SET amount = $1
            WHERE user_id = $2 AND date = $3
        ",
    )
    .bind(updated_water.amount)
    .bind(updated_water.user_id)
    .bind(updated_water.date)
    .execute(conn)
    .await?;

    return Ok(());
}
