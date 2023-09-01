use std::sync::Arc;

use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    db,
    dto::{favorite_food_dtos::CreateFavoriteFoodDto, food_dtos::FoodDto},
    error, error_message,
    models::enums::Source,
    repos::favorite_food_repo,
    response,
    services::usda_food::get_usda_foods_by_ids,
};

pub async fn get_favorite_foods(req: Request<PgPool>) -> Result {
    let user_id = req.param("uid")?;

    let connection = req.state();

    let ids = match favorite_food_repo::get_by_user(&connection, &user_id).await {
        Ok(ids) => ids,
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    if ids.is_empty() {
        return Ok(response!(StatusCode::Ok, Vec::<FoodDto>::new()));
    }

    let foods = match get_usda_foods_by_ids(ids).await {
        Ok(foods) => foods,
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    return Ok(response!(StatusCode::Ok, foods));
}

pub async fn is_favorite_food(req: Request<PgPool>) -> Result {
    let user_id = req.param("uid")?;
    let food_id = req.param("fid")?;
    let source = req.param("source")?;

    let Ok(food_id) = food_id.parse::<i32>() else {
        return Ok(error_message!(
            tide::StatusCode::BadRequest,
            "invalid-food-id",
            "Invalid food id. Must be an integer."
        ))
    };

    let Ok(source) = source.parse::<Source>() else {
        return Ok(error_message!(
            tide::StatusCode::BadRequest,
            "invalid-source",
            "Invalid source. Must be one of: user, usda"
        ))
    };

    let connection = req.state();

    match favorite_food_repo::get(connection, &user_id, food_id, &source).await {
        Ok(_) => (),
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    return Ok(response!(StatusCode::Ok));
}

pub async fn post_favorite_food(mut req: Request<PgPool>) -> Result {
    let food = req.body_json::<CreateFavoriteFoodDto>().await?;

    let connection = req.state();

    match favorite_food_repo::create(connection, &food.into()).await {
        Ok(_) => (),
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    }

    return Ok(response!(StatusCode::Created));
}

pub async fn delete_favorite_food(mut req: Request<PgPool>) -> Result {
    let food = req.body_json::<CreateFavoriteFoodDto>().await?;

    let connection = req.state();

    match favorite_food_repo::delete(connection, &food.user_id, food.food_id, &food.source).await {
        Ok(_) => (),
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    return Ok(response!(StatusCode::Ok));
}
