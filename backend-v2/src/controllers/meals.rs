use chrono::NaiveDate;
use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    dto::meal_dtos::{CreateMealDto, MealDto},
    error_message,
    models::enums::Source,
    repos::{food_repo, meal_repo},
    response,
    services::usda_food,
};

use super::utils::traits::{MapErrorToServerError, ParseYMD};

pub async fn get_meals(req: Request<PgPool>) -> Result {
    let user_id = req.param("uid")?;
    let date = req.param("date")?;

    let connection = req.state();

    let Ok(date) = NaiveDate::parse_ymd(date) else {
        return Ok(error_message!(
            tide::StatusCode::BadRequest,
            "invalid-date-format",
            "Invalid date format. Format must be YYYY-MM-DD"
        ));
    };

    let mut usda_meals =
        meal_repo::get_by_user_date_and_source(connection, user_id, date, &Source::Usda)
            .await
            .map_err_to_server_error()?;

    let mut user_meals =
        meal_repo::get_by_user_date_and_source(connection, user_id, date, &Source::User)
            .await
            .map_err_to_server_error()?;

    if usda_meals.is_empty() && user_meals.is_empty() {
        return Ok(response!(StatusCode::Ok, Vec::<MealDto>::new()));
    }

    let usda_ids: Vec<i32> = usda_meals.iter().map(|m| m.food_id).collect();
    let user_ids: Vec<i32> = user_meals.iter().map(|m| m.food_id).collect();

    let mut usda_foods = usda_food::get_usda_foods_by_ids(usda_ids).await?;
    let mut user_foods = food_repo::get_by_ids(connection, &user_ids)
        .await
        .map_err_to_server_error()?
        .into_iter()
        .map(|f| f.into())
        .collect::<Vec<_>>();

    usda_meals.append(&mut user_meals);
    usda_foods.append(&mut user_foods);

    let meals = std::iter::zip(usda_meals, usda_foods)
        .map(|(meal, food)| MealDto::from_meal(meal, food))
        .collect::<Vec<_>>();

    Ok(response!(StatusCode::Ok, meals))
}

pub async fn get_recent_meals(req: Request<PgPool>) -> Result {
    let user_id = req.param("uid")?;

    let connection = req.state();

    let meals = meal_repo::get_recent(connection, user_id)
        .await
        .map_err_to_server_error()?;

    if meals.is_empty() {
        return Ok(response!(StatusCode::Ok, Vec::<MealDto>::new()));
    }

    let ids = meals.iter().map(|m| m.food_id).collect::<Vec<i32>>();
    let usda_foods = usda_food::get_usda_foods_by_ids(ids).await?;

    let usda_meals = std::iter::zip(meals, usda_foods)
        .map(|(meal, food)| MealDto::from_meal(meal, food))
        .collect::<Vec<_>>();

    Ok(response!(StatusCode::Ok, usda_meals))
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
