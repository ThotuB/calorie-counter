use serde_json::json;
use tide::{Request, Result, StatusCode};

use crate::{db, error, error_message, repos::water_repo, response};

use super::utils::idk::FromISO;

pub async fn get_water(req: Request<()>) -> Result {
    let user_id = req.param("uid")?;
    let date = req.param("date")?;

    let connection = &mut db::establish_connection().await;

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

    match water_repo::get_by_user_and_date(connection, user_id, date).await {
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
        Ok(water) => return Ok(response!(StatusCode::Ok, water)),
    }
}

// pub fn put_water(water: Json<CreateWaterDto>) -> Result<(), Status> {
//     let connection = &mut db::establish_connection();
//     let water = water.into_inner();
//
//     try_db!(water_repo::update(connection, water.into()), Option);
//
//     return Ok(());
// }
