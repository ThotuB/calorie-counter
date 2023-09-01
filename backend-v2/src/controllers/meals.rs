use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    db,
    dto::{
        food_dtos::FoodDto,
        meal_dtos::{CreateMealDto, MealDto},
    },
    error, error_message,
    repos::meal_repo,
    response,
    services::usda_food::get_usda_foods_by_ids,
};

use super::utils::idk::FromISO;

pub async fn get_meals(req: Request<&PgPool>) -> Result {
    let user_id = req.param("uid")?;
    let date = req.param("date")?;

    let connection = *req.state();

    let date = match FromISO::from_iso(date) {
        Ok(date) => date,
        Err(_) => {
            return Ok(error_message!(
                tide::StatusCode::BadRequest,
                "invalid-date-format",
                "Invalid date format. Format must be YYYY-MM-DD"
            ))
        }
    };

    let meals = match meal_repo::get_by_user_and_date(connection, &user_id, date).await {
        Ok(meals) => meals,
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    if meals.is_empty() {
        return Ok(response!(StatusCode::Ok, Vec::<FoodDto>::new()));
    }

    let ids = meals.iter().map(|m| m.food_id).collect::<Vec<i32>>();
    let foods = match get_usda_foods_by_ids(ids).await {
        Ok(foods) => foods,
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    let data = std::iter::zip(meals, foods)
        .map(|(meal, food)| MealDto::from_meal(meal, food))
        .collect::<Vec<_>>();

    return Ok(response!(StatusCode::Ok, data));
}

pub async fn post_meal(mut req: Request<&PgPool>) -> Result {
    let meal = req.body_json::<CreateMealDto>().await?;

    let connection = *req.state();

    match meal_repo::create(connection, &meal.into()).await {
        Ok(_) => (),
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    }

    return Ok(response!(StatusCode::Created));
}

pub async fn delete_meal(req: Request<&PgPool>) -> Result {
    let meal_id = req.param("mid")?;

    let meal_id = match meal_id.parse::<i32>() {
        Ok(meal_id) => meal_id,
        Err(_) => {
            return Ok(error_message!(
                tide::StatusCode::BadRequest,
                "invalid-meal-id",
                "Invalid meal id. Must be an integer."
            ))
        }
    };

    let connection = *req.state();

    match meal_repo::delete(connection, meal_id).await {
        Ok(_) => (),
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    }

    return Ok(response!(StatusCode::Ok));
}
