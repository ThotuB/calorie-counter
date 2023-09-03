use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    dto::{
        food_dtos::FoodDto,
        meal_dtos::{CreateMealDto, MealDto},
    },
    error_message,
    repos::meal_repo,
    response,
    services::usda_food::get_usda_foods_by_ids,
};

use super::utils::traits::{FromISO, MapErrorToServerError};

pub async fn get_meals(req: Request<PgPool>) -> Result {
    let user_id = req.param("uid")?;
    let date = req.param("date")?;

    let connection = req.state();

    let Ok(date) = FromISO::from_iso(date) else {
        return Ok(error_message!(
            tide::StatusCode::BadRequest,
            "invalid-date-format",
            "Invalid date format. Format must be YYYY-MM-DD"
        ));
    };

    let meals = meal_repo::get_by_user_and_date(connection, user_id, date)
        .await
        .map_err_to_server_error()?;

    if meals.is_empty() {
        return Ok(response!(StatusCode::Ok, Vec::<FoodDto>::new()));
    }

    let ids = meals.iter().map(|m| m.food_id).collect::<Vec<i32>>();
    let foods = get_usda_foods_by_ids(ids).await.map_err_to_server_error()?;

    let data = std::iter::zip(meals, foods)
        .map(|(meal, food)| MealDto::from_meal(meal, food))
        .collect::<Vec<_>>();

    Ok(response!(StatusCode::Ok, data))
}

pub async fn post_meal(mut req: Request<PgPool>) -> Result {
    let meal = req.body_json::<CreateMealDto>().await?;

    let connection = req.state();

    meal_repo::create(connection, &meal.into())
        .await
        .map_err_to_server_error()?;

    Ok(response!(StatusCode::Created))
}

pub async fn delete_meal(req: Request<PgPool>) -> Result {
    let meal_id = req.param("mid")?;

    let Ok(meal_id) = meal_id.parse::<i32>() else {
        return Ok(error_message!(
            tide::StatusCode::BadRequest,
            "invalid-meal-id",
            "Invalid meal id. Must be an integer."
        ));
    };

    let connection = req.state();

    meal_repo::delete(connection, meal_id)
        .await
        .map_err_to_server_error()?;

    Ok(response!(StatusCode::Ok))
}
