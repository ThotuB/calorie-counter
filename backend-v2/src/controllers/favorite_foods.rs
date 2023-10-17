use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    dto::{favorite_food_dtos::CreateFavoriteFoodDto, food_dtos::FoodDto},
    error_message,
    models::enums::Source,
    repos::favorite_food_repo,
    response,
    services::usda_food,
};

use super::utils::traits::MapErrorToServerError;

pub async fn get_favorite_foods(req: Request<PgPool>) -> Result {
    let user_id = req.param("uid")?;

    let connection = req.state();

    let ids = favorite_food_repo::get_ids_by_user_and_source(connection, user_id, &Source::Usda)
        .await
        .map_err_to_server_error()?;

    let user_foods = favorite_food_repo::get_created_by_user(connection, user_id)
        .await
        .map_err_to_server_error()?;

    if ids.is_empty() && user_foods.is_empty() {
        return Ok(response!(StatusCode::Ok, Vec::<FoodDto>::new()));
    }

    let mut usda_foods = if ids.is_empty() {
        Vec::new()
    } else {
        usda_food::get_usda_foods_by_ids(ids).await?
    };

    let mut foods = Vec::new();
    foods.append(&mut user_foods.into_iter().map(|f| f.into()).collect());
    foods.append(&mut usda_foods);

    Ok(response!(StatusCode::Ok, foods))
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
        ));
    };

    let Ok(source) = source.parse::<Source>() else {
        return Ok(error_message!(
            tide::StatusCode::BadRequest,
            "invalid-source",
            "Invalid source. Must be one of: user, usda"
        ));
    };

    let connection = req.state();

    let Some(_) = favorite_food_repo::get(connection, user_id, food_id, &source)
        .await
        .map_err_to_server_error()?
    else {
        return Ok(response!(StatusCode::Ok, false));
    };

    Ok(response!(StatusCode::Ok, true))
}

pub async fn post_favorite_food(mut req: Request<PgPool>) -> Result {
    let food = req.body_json::<CreateFavoriteFoodDto>().await?;

    let connection = req.state();

    favorite_food_repo::create(connection, &food.into())
        .await
        .map_err_to_server_error()?;

    Ok(response!(StatusCode::Created))
}

pub async fn delete_favorite_food(req: Request<PgPool>) -> Result {
    let user_id = req.param("uid")?;
    let food_id = req.param("fid")?;
    let source = req.param("source")?;

    let Ok(food_id) = food_id.parse::<i32>() else {
        return Ok(error_message!(
            tide::StatusCode::BadRequest,
            "invalid-food-id",
            "Invalid food id. Must be an integer."
        ));
    };

    let Ok(source) = source.parse::<Source>() else {
        return Ok(error_message!(
            tide::StatusCode::BadRequest,
            "invalid-source",
            "Invalid source. Must be one of: user, usda"
        ));
    };

    let connection = req.state();

    favorite_food_repo::delete(connection, user_id, food_id, &source)
        .await
        .map_err_to_server_error()?;

    Ok(response!(StatusCode::Ok))
}
