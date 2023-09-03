use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    dto::food_dtos::FoodDto, error_message, models::food::NewFood, repos::food_repo, response,
};

use super::utils::traits::MapErrorToServerError;

pub async fn get_food(req: Request<PgPool>) -> Result {
    let food_id = req.param("id")?;

    let Ok(food_id) = food_id.parse::<i32>() else {
        return Ok(error_message!(
            StatusCode::BadRequest,
            "invalid-food-id",
            "Invalid food id."
        ));
    };

    let connection = req.state();

    let Some(food) = food_repo::get_by_id(connection, food_id).await.map_err_to_server_error()? else {
        return Ok(error_message!(
            StatusCode::NotFound,
            "no-food",
            "No food found with that id."
        ))
    };

    Ok(response!(StatusCode::Ok, FoodDto::from(food)))
}

pub async fn get_foods_by_user(req: Request<PgPool>) -> Result {
    let user_id = req.param("uid")?;

    let connection = req.state();

    let foods = food_repo::get_by_user(connection, user_id)
        .await
        .map_err_to_server_error()?;

    let data = foods.into_iter().map(FoodDto::from).collect::<Vec<_>>();

    Ok(response!(StatusCode::Ok, data))
}

pub async fn get_food_by_barcode(req: Request<PgPool>) -> Result {
    let barcode_id = req.param("barcode_id")?;

    let Ok(barcode_id) = barcode_id.parse::<i64>() else {
        return Ok(error_message!(
            StatusCode::BadRequest,
            "invalid-barcode",
            "Invalid barcode."
        ));
    };

    let connection = req.state();

    let Some(food) = food_repo::get_food_by_barcode(connection, barcode_id).await.map_err_to_server_error()? else {
        return Ok(error_message!(
            StatusCode::NotFound,
            "no-food",
            "No food found with that barcode."
        ))
    };

    Ok(response!(StatusCode::Ok, FoodDto::from(food)))
}

pub async fn post_food(mut req: Request<PgPool>) -> Result {
    let food = req.body_json::<NewFood>().await?;

    let connection = req.state();

    food_repo::create(connection, &food)
        .await
        .map_err_to_server_error()?;

    Ok(response!(StatusCode::Ok))
}

pub async fn delete_food(req: Request<PgPool>) -> Result {
    let food_id = req.param("id")?;

    let Ok(food_id) = food_id.parse::<i32>() else {
        return Ok(error_message!(
            StatusCode::BadRequest,
            "invalid-food-id",
            "Invalid food id."
        ));
    };

    let connection = req.state();

    food_repo::delete(connection, food_id)
        .await
        .map_err_to_server_error()?;

    Ok(response!(StatusCode::Ok))
}
