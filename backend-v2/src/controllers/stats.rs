use chrono::{Datelike, Duration, NaiveDate};
use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    dto::{progress_dtos::ProgressDto, stats_dtos::StatsDto},
    error_message,
    repos::{macro_goal_repo, meal_repo},
    response,
    services::usda_food,
};

use super::utils::traits::{MapErrorToServerError, ParseYMD};

pub async fn get_stats(req: Request<PgPool>) -> Result {
    let user_id = req.param("uid")?;
    let date = req.param("date")?;

    let Ok(today) = NaiveDate::parse_ymd(date) else {
        return Ok(error_message!(
            tide::StatusCode::BadRequest,
            "invalid-date-format",
            "Invalid date format. Format must be YYYY-MM-DD"
        ));
    };

    let connection = req.state();

    let meals = meal_repo::get_by_user_and_date(connection, user_id, today)
        .await
        .map_err_to_server_error()?;

    let last_week = today - Duration::days(7);
    let yesterday = today - Duration::days(1);

    let nutrients_last_week = meal_repo::get_total_macro_intake_per_day_between_dates_for_user(
        connection, user_id, &last_week, &yesterday,
    )
    .await
    .map_err_to_server_error()?;

    let mut calories_last_week: [i32; 7] = [0; 7];
    for nutrients_per_day in nutrients_last_week {
        let day_index = 6 - (yesterday.ordinal0() - nutrients_per_day.date.ordinal0());
        calories_last_week[day_index as usize] = nutrients_per_day.calories.unwrap_or(0);
    }

    let Some(macro_goal) = macro_goal_repo::get_by_uid(connection, user_id)
        .await
        .map_err_to_server_error()? else
    {
        return Ok(error_message!(
            tide::StatusCode::NotFound,
            "macro-goal-not-found",
            "Macro goal not found"
        ));
    };

    if meals.is_empty() {
        return Ok(response!(
            StatusCode::Ok,
            StatsDto::empty(today, &macro_goal, calories_last_week,)
        ));
    }

    let ids = meals.iter().map(|m| m.food_id).collect::<Vec<i32>>();

    let foods = usda_food::get_usda_foods_by_ids(ids).await?;

    Ok(response!(
        StatusCode::Ok,
        StatsDto::new(today, &macro_goal, foods, calories_last_week,)
    ))
}

pub async fn get_progress(req: Request<PgPool>) -> Result {
    let user_id = req.param("uid")?;
    let date_from = req.param("date_from")?;
    let date_to = req.param("date_to")?;

    let Ok(date_from) = NaiveDate::parse_ymd(date_from) else {
        return Ok(error_message!(
            StatusCode::BadRequest,
            "invalid-date-from-format",
            "Invalid date from format. Format must be YYYY-MM-DD"
        ));
    };
    let Ok(date_to) = NaiveDate::parse_ymd(date_to) else {
        return Ok(error_message!(
            StatusCode::BadRequest,
            "invalid-date-to-format",
            "Invalid date to format. Format must be YYYY-MM-DD"
        ));
    };

    let connection = req.state();

    let Some(goals) = macro_goal_repo::get_by_uid(connection, user_id)
        .await
        .map_err_to_server_error()? else
    {
        return Ok(error_message!(
            StatusCode::NotFound,
            "macro-goal-not-found",
            "Macro goal not found"
        ));
    };

    let meals = meal_repo::get_total_macro_intake_per_day_between_dates_for_user(
        connection, user_id, &date_from, &date_to,
    )
    .await
    .map_err_to_server_error()?;

    if meals.is_empty() {
        return Ok(response!(StatusCode::Ok, ProgressDto::empty()));
    }

    let averages_per_meal_type =
        meal_repo::get_average_macro_intake_per_meal_type_between_dates_for_user(
            connection, user_id, &date_from, &date_to,
        )
        .await
        .map_err_to_server_error()?;

    let data = ProgressDto::new(goals, meals, averages_per_meal_type);

    Ok(response!(StatusCode::Ok, data))
}
