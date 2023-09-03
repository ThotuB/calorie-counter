use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{dto::water_dtos::CreateWaterDto, error_message, repos::water_repo, response};

use super::utils::traits::{FromISO, MapErrorToServerError};

pub async fn get_water(req: Request<PgPool>) -> Result {
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

    let amount = water_repo::get_by_user_and_date(connection, user_id, date)
        .await
        .map_err_to_server_error()?;

    Ok(response!(StatusCode::Ok, amount))
}

pub async fn put_water(mut req: Request<PgPool>) -> Result {
    let water = req.body_json::<CreateWaterDto>().await?;

    let connection = req.state();

    water_repo::update(connection, water.into())
        .await
        .map_err_to_server_error()?;

    Ok(response!(StatusCode::Ok))
}
