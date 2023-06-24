use chrono::NaiveDate;
use rocket::serde::json::Json;

use crate::{db, dto::water_dtos::CreateWaterDto, repos::water_repo};

#[get("/water?<user_id>&<date>")]
pub fn get_water(user_id: String, date: String) -> Json<i32> {
    let connection = &mut db::establish_connection();

    let date = NaiveDate::parse_from_str(&date, "%Y-%m-%d").unwrap();

    match water_repo::get_water(connection, &user_id, date) {
        Some(water) => Json(water.amount),
        None => Json(0),
    }
}

#[put("/water", format = "json", data = "<water>")]
pub fn put_water(water: Json<CreateWaterDto>) -> Json<i32> {
    let connection = &mut db::establish_connection();
    let water = water.into_inner();

    let water = water_repo::update_water(connection, water.into());

    return Json(water.amount);
}
