use chrono::NaiveDate;
use rocket::{http::Status, serde::json::Json};

use crate::{db, models::water::Water};

#[get("/water?<user_id>&<date>")]
pub fn get_water(user_id: String, date: String) -> Result<Json<Water>, Status> {
    let connection = &mut db::establish_connection();

    let date = NaiveDate::parse_from_str(&date, "%Y-%m-%d").unwrap();

    match Water::get_water(connection, &user_id, date) {
        Some(water) => Ok(Json(water)),
        None => Err(Status::NotFound),
    }
}

#[put("/water", format = "json", data = "<water>")]
pub fn put_water(water: Json<Water>) -> Json<Water> {
    let connection = &mut db::establish_connection();

    return Json(Water::update_water(connection, water.into_inner()));
}
