use sqlx::{PgPool, Result};

use crate::models::macro_goal::MacroGoal;

pub async fn get_by_uid(conn: &PgPool, uid: &str) -> Result<Option<MacroGoal>> {
    let macro_goal = sqlx::query_as!(
        MacroGoal,
        r#"
        SELECT user_id, calories, carbs, protein, fat, percent_carbs, percent_protein, percent_fat
        FROM macro_goals
        WHERE user_id = $1
        "#,
        uid
    )
    .fetch_optional(conn)
    .await?;

    return Ok(macro_goal);
}

pub async fn create(conn: &PgPool, new_macro_goal: &MacroGoal) -> Result<()> {
    sqlx::query!(
        r#"
        INSERT INTO macro_goals (user_id, calories, carbs, protein, fat)
        VALUES ($1, $2, $3, $4, $5)
        "#,
        new_macro_goal.user_id,
        new_macro_goal.calories,
        new_macro_goal.carbs,
        new_macro_goal.protein,
        new_macro_goal.fat,
    )
    .execute(conn)
    .await?;

    return Ok(());
}

pub async fn update(conn: &PgPool, macro_goal: &MacroGoal) -> Result<()> {
    sqlx::query!(
        r#"
        UPDATE macro_goals
        SET calories = $2, carbs = $3, protein = $4, fat = $5
        WHERE user_id = $1
        "#,
        macro_goal.user_id,
        macro_goal.calories,
        macro_goal.carbs,
        macro_goal.protein,
        macro_goal.fat,
    )
    .execute(conn)
    .await?;

    return Ok(());
}
