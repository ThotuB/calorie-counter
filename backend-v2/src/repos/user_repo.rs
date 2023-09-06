use sqlx::{PgPool, Result};

pub async fn get(conn: &PgPool, uid: &str) -> Result<Option<String>> {
    struct UserId {
        user_id: String,
    }

    let user_id = sqlx::query_as!(
        UserId,
        r#"
            SELECT user_id
            FROM settings
            WHERE user_id = $1
        "#,
        uid
    )
    .fetch_optional(conn)
    .await?
    .map(|u| u.user_id);

    Ok(user_id)
}

// pub async fn create(conn: &PgPool, new_settings: &Settings) -> Result<()> {
//     sqlx::query!(
//         r#"
//             INSERT INTO settings (user_id, weight_goal, gender, age, height, weight, system, water_goal, water_size)
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//         "#,
//         new_settings.user_id,
//         &new_settings.weight_goal as &WeightGoal,
//         &new_settings.gender as &Gender,
//         new_settings.age,
//         new_settings.height,
//         new_settings.weight,
//         &new_settings.system as &System,
//         new_settings.water_goal,
//         &new_settings.water_size as &WaterSize,
//     )
//     .execute(conn)
//     .await?;
//
//     Ok(())
// }
