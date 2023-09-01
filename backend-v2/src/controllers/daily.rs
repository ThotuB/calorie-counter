use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    db,
    dto::{daily_dtos::DailyDto, meal_dtos::MealDto},
    error, error_message,
    repos::{macro_goal_repo, meal_repo},
    response,
    services::usda_food::get_usda_foods_by_ids,
};

use super::utils::idk::FromISO;

pub async fn get_daily(req: Request<&PgPool>) -> Result {
    let user_id = req.param("uid")?;
    let date = req.param("date")?;

    let date = match chrono::NaiveDate::from_iso(&date) {
        Ok(date) => date,
        Err(_) => {
            return Ok(error_message!(
                StatusCode::BadRequest,
                "invalid-date-format",
                "Invalid date format. Format must be YYYY-MM-DD"
            ))
        }
    };

    let connection = *req.state();

    let meals = match meal_repo::get_by_user_and_date(connection, &user_id, date).await {
        Ok(meals) => meals,
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    let macro_goal = match macro_goal_repo::get_by_uid(connection, &user_id).await {
        Ok(Some(macro_goal)) => macro_goal,
        Ok(None) => {
            return Ok(error_message!(
                StatusCode::NotFound,
                "no-macro-goal",
                "No macro goal found for user."
            ))
        }
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    if meals.is_empty() {
        return Ok(response!(StatusCode::Ok, DailyDto::empty(date, macro_goal)));
    }

    let ids = meals.iter().map(|m| m.food_id).collect::<Vec<i32>>();
    let foods = match get_usda_foods_by_ids(ids).await {
        Ok(foods) => foods,
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    let data = DailyDto::new(
        date,
        macro_goal,
        std::iter::zip(meals, foods)
            .map(|(meal_repo, food)| MealDto::from_meal(meal_repo, food))
            .collect::<Vec<_>>(),
    );

    return Ok(response!(StatusCode::Ok, data));
}
