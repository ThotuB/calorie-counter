use crate::models::settings::{Gender, Settings, System, WaterSize, WeightGoal};
use sqlx::{PgPool, Result};

pub async fn get_by_uid(conn: &PgPool, uid: &str) -> Result<Option<Settings>> {
    let settings = sqlx::query_as!(
        Settings,
        r#"
            SELECT user_id, weight_goal AS "weight_goal: _", gender AS "gender: _", age, height, weight, system AS "system: _", water_goal, water_size AS "water_size: _"
            FROM settings
            WHERE user_id = $1
        "#,
        uid
    )
    .fetch_optional(conn)
    .await?;

    return Ok(settings);
}

pub async fn create(conn: &PgPool, new_settings: &Settings) -> Result<()> {
    sqlx::query!(
        r#"
            INSERT INTO settings (user_id, weight_goal, gender, age, height, weight, system, water_goal, water_size)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        "#,
        new_settings.user_id,
        &new_settings.weight_goal as &WeightGoal,
        &new_settings.gender as &Gender,
        new_settings.age,
        new_settings.height,
        new_settings.weight,
        &new_settings.system as &System,
        new_settings.water_goal,
        &new_settings.water_size as &WaterSize,
    )
    .execute(conn)
    .await?;

    return Ok(());
}
