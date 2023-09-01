use chrono::Datelike;
use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    db,
    dto::{progress_dtos::ProgressDto, stats_dtos::StatsDto},
    error, error_message,
    repos::{macro_goal_repo, meal_repo},
    response,
    services::usda_food::get_usda_foods_by_ids,
};

use super::utils::idk::FromISO;

pub async fn get_stats(req: Request<&PgPool>) -> Result {
    let user_id = req.param("uid")?;
    let date = req.param("date")?;

    let today = match chrono::NaiveDate::from_iso(date) {
        Ok(date) => date,
        Err(_) => {
            return Ok(error_message!(
                tide::StatusCode::BadRequest,
                "invalid-date-format",
                "Invalid date format. Format must be YYYY-MM-DD"
            ))
        }
    };

    let connection = *req.state();

    let meals = match meal_repo::get_by_user_and_date(connection, &user_id, today).await {
        Ok(meals) => meals,
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    let last_week = today - chrono::Duration::days(7);
    let yesterday = today - chrono::Duration::days(1);

    let nutrients_last_week =
        match meal_repo::get_total_macro_intake_per_day_between_dates_for_user(
            connection, &user_id, &last_week, &yesterday,
        )
        .await
        {
            Ok(nutrients) => nutrients,
            Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
        };

    let mut calories_last_week: [i32; 7] = [0; 7];
    for nutrients_per_day in nutrients_last_week {
        let day_index = 6 - (yesterday.ordinal0() - nutrients_per_day.date.ordinal0());
        calories_last_week[day_index as usize] = nutrients_per_day.calories.unwrap_or(0);
    }

    let macro_goal = match macro_goal_repo::get_by_uid(connection, &user_id).await {
        Ok(Some(macro_goal)) => macro_goal,
        Ok(None) => {
            return Ok(error_message!(
                tide::StatusCode::NotFound,
                "macro-goal-not-found",
                "Macro goal not found"
            ))
        }
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    if meals.is_empty() {
        return Ok(response!(
            StatusCode::Ok,
            StatsDto::empty(today, &macro_goal, calories_last_week,)
        ));
    }

    let ids = meals.iter().map(|m| m.food_id).collect::<Vec<i32>>();

    let foods = match get_usda_foods_by_ids(ids).await {
        Ok(foods) => foods,
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    return Ok(response!(
        StatusCode::Ok,
        StatsDto::new(today, &macro_goal, foods, calories_last_week,)
    ));
}

pub async fn get_progress(req: Request<&PgPool>) -> Result {
    let user_id = req.param("uid")?;
    let date_from = req.param("date_from")?;
    let date_to = req.param("date_to")?;

    let date_from = match chrono::NaiveDate::from_iso(&date_from) {
        Ok(date) => date,
        Err(_) => {
            return Ok(error_message!(
                StatusCode::BadRequest,
                "invalid-date-from-format",
                "Invalid date from format. Format must be YYYY-MM-DD"
            ))
        }
    };
    let date_to = match chrono::NaiveDate::from_iso(&date_to) {
        Ok(date) => date,
        Err(_) => {
            return Ok(error_message!(
                StatusCode::BadRequest,
                "invalid-date-to-format",
                "Invalid date to format. Format must be YYYY-MM-DD"
            ))
        }
    };

    let connection = *req.state();

    let meals = match meal_repo::get_total_macro_intake_per_day_between_dates_for_user(
        connection, &user_id, &date_from, &date_to,
    )
    .await
    {
        Ok(meals) => meals,
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    if meals.is_empty() {
        return Ok(response!(StatusCode::Ok, ProgressDto::empty()));
    }

    let averages_per_meal_type =
        match meal_repo::get_average_macro_intake_per_meal_type_between_dates_for_user(
            connection, &user_id, &date_from, &date_to,
        )
        .await
        {
            Ok(averages_per_meal_type) => averages_per_meal_type,
            Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
        };

    let data = ProgressDto::new(meals, averages_per_meal_type);

    return Ok(response!(StatusCode::Ok, data));
}
