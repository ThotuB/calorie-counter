use sqlx::{PgPool, Result};

use crate::models::water::Water;

pub async fn get_by_user_and_date(
    conn: &PgPool,
    uid: &str,
    day: chrono::NaiveDate,
) -> Result<i32> {
    #[derive(sqlx::FromRow)]
    pub struct WaterAmount {
        pub amount: i32,
    }

    let amount: i32 = sqlx::query_as!(
        WaterAmount,
        r"
            SELECT amount
            FROM water
            WHERE user_id = $1 AND date = $2
        ",
        uid,
        day,
    )
    .fetch_optional(conn)
    .await?
    .unwrap_or(WaterAmount { amount: 0 })
    .amount;

    return Ok(amount);
}

pub async fn get_by_user(conn: &PgPool, uid: &str) -> Result<Vec<Water>> {
    return sqlx::query_as!(
        Water,
        r"
            SELECT user_id, date, amount
            FROM water
            WHERE user_id = $1
        ",
        uid,
    )
    .fetch_all(conn)
    .await;
}

pub async fn get_by_user_between_dates(
    conn: &PgPool,
    uid: &str,
    start: chrono::NaiveDate,
    end: chrono::NaiveDate,
) -> Result<Vec<Water>> {
    return sqlx::query_as!(
        Water,
        r"
            SELECT user_id, date, amount
            FROM water
            WHERE user_id = $1 AND date >= $2 AND date <= $3
        ",
        uid,
        start,
        end,
    )
    .fetch_all(conn)
    .await;
}

// TODO: Write function better
pub async fn get_average_amount_by_user_between_dates(
    conn: &PgPool,
    uid: &str,
    start_date: &chrono::NaiveDate,
    end_date: &chrono::NaiveDate,
) -> Result<f32> {
    #[derive(FromRow)]
    struct WaterAverage {
        pub amount: Option<f32>,
    }

    let avg = sqlx::query_as!(
        WaterAverage,
        r"
            SELECT CAST(AVG(amount) AS REAL) AS amount
            FROM water
            WHERE user_id = $1 AND date >= $2 AND date <= $3
        ",
        uid,
        start_date,
        end_date,
    )
    .fetch_optional(conn)
    .await?
    .unwrap_or(WaterAverage { amount: Some(0.0) })
    .amount
    .unwrap_or(0.0);

    return Ok(avg);
}

pub async fn update(conn: &PgPool, updated_water: Water) -> Result<()> {
    sqlx::query!(
        r"
            UPDATE water
            SET amount = $1
            WHERE user_id = $2 AND date = $3
        ",
        updated_water.amount,
        updated_water.user_id,
        updated_water.date,
    )
    .execute(conn)
    .await?;

    return Ok(());
}
