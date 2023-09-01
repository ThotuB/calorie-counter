use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    db, dto::food_dtos::FoodDto, error, error_message, models::food::NewFood, repos::food_repo,
    response,
};

pub async fn get_food(req: Request<&PgPool>) -> Result {
    let food_id = req.param("id")?;

    let food_id = match food_id.parse::<i32>() {
        Ok(food_id) => food_id,
        Err(_) => {
            return Ok(error_message!(
                StatusCode::BadRequest,
                "invalid-food-id",
                "Invalid food id."
            ))
        }
    };

    let connection = *req.state();

    let food = match food_repo::get_by_id(connection, food_id).await {
        Ok(Some(food)) => food,
        Ok(None) => {
            return Ok(error_message!(
                StatusCode::NotFound,
                "no-food",
                "No food found with that id."
            ))
        }
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    return Ok(response!(StatusCode::Ok, FoodDto::from(food)));
}

pub async fn get_foods_by_user(req: Request<&PgPool>) -> Result {
    let user_id = req.param("uid")?;

    let connection = *req.state();

    let foods = match food_repo::get_by_user(connection, &user_id).await {
        Ok(foods) => foods,
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    let data = foods
        .into_iter()
        .map(|f| FoodDto::from(f))
        .collect::<Vec<_>>();

    return Ok(response!(StatusCode::Ok, data));
}

pub async fn get_food_by_barcode(req: Request<&PgPool>) -> Result {
    let barcode_id = req.param("barcode_id")?;

    let barcode_id = match barcode_id.parse::<i64>() {
        Ok(barcode_id) => barcode_id,
        Err(_) => {
            return Ok(error_message!(
                StatusCode::BadRequest,
                "invalid-barcode",
                "Invalid barcode."
            ))
        }
    };

    let connection = *req.state();

    let food = match food_repo::get_food_by_barcode(connection, barcode_id).await {
        Ok(Some(food)) => food,
        Ok(None) => {
            return Ok(error_message!(
                StatusCode::NotFound,
                "no-food",
                "No food found with that barcode."
            ))
        }
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    return Ok(response!(StatusCode::Ok, FoodDto::from(food)));
}

pub async fn post_food(mut req: Request<&PgPool>) -> Result {
    let food = req.body_json::<NewFood>().await?;

    let connection = *req.state();

    match food_repo::create(connection, &food).await {
        Ok(food) => food,
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    return Ok(response!(StatusCode::Ok));
}

pub async fn delete_food(req: Request<&PgPool>) -> Result {
    let food_id = req.param("id")?;

    let food_id = match food_id.parse::<i32>() {
        Ok(food_id) => food_id,
        Err(_) => {
            return Ok(error_message!(
                StatusCode::BadRequest,
                "invalid-food-id",
                "Invalid food id."
            ))
        }
    };

    let connection = *req.state();

    match food_repo::delete(connection, food_id).await {
        Ok(_) => (),
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    return Ok(response!(StatusCode::Ok));
}
