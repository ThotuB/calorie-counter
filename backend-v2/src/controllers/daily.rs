use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    dto::{daily_dtos::DailyDto, meal_dtos::MealDto},
    error_message,
    repos::{macro_goal_repo, meal_repo},
    response,
    services::usda_food::get_usda_foods_by_ids,
};

use super::utils::traits::{FromISO, MapErrorToServerError};

pub async fn get_daily(req: Request<PgPool>) -> Result {
    let user_id = req.param("uid")?;
    let date = req.param("date")?;

    let Ok(date) = chrono::NaiveDate::from_iso(date) else {
        return Ok(error_message!(
            StatusCode::BadRequest,
            "invalid-date-format",
            "Invalid date format. Format must be YYYY-MM-DD"
        ));
    };

    let connection = req.state();

    let meals = meal_repo::get_by_user_and_date(connection, user_id, date)
        .await
        .map_err_to_server_error()?;

    let Some(macro_goal) = macro_goal_repo::get_by_uid(connection, user_id).await.map_err_to_server_error()? else {
        return Ok(error_message!(
            StatusCode::NotFound,
            "no-macro-goal",
            "No macro goal found for user."
        ))
    };

    if meals.is_empty() {
        return Ok(response!(StatusCode::Ok, DailyDto::empty(date, macro_goal)));
    }

    let ids = meals.iter().map(|m| m.food_id).collect::<Vec<i32>>();
    let foods = get_usda_foods_by_ids(ids).await.map_err_to_server_error()?;

    let data = DailyDto::new(
        date,
        macro_goal,
        std::iter::zip(meals, foods)
            .map(|(meal_repo, food)| MealDto::from_meal(meal_repo, food))
            .collect::<Vec<_>>(),
    );

    Ok(response!(StatusCode::Ok, data))
}
