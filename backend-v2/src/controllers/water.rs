use std::sync::Arc;

use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    db, dto::water_dtos::CreateWaterDto, error, error_message, repos::water_repo, response,
};

use super::utils::idk::FromISO;

pub async fn get_water(req: Request<PgPool>) -> Result {
    let user_id = req.param("uid")?;
    let date = req.param("date")?;

    let connection = req.state();

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

    let amount = match water_repo::get_by_user_and_date(connection, user_id, date).await {
        Ok(amount) => amount,
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    return Ok(response!(StatusCode::Ok, amount));
}

pub async fn put_water(mut req: Request<PgPool>) -> Result {
    let water = req.body_json::<CreateWaterDto>().await?;

    let connection = req.state();

    match water_repo::update(connection, water.into()).await {
        Ok(_) => (),
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    }

    return Ok(response!(StatusCode::Ok));
}
