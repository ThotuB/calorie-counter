use chrono::NaiveDate;
use rocket::{http::Status, serde::json::Json};

use crate::{db, dto::water_dtos::CreateWaterDto, repos::water_repo, try_db, utils::FromISO};

#[get("/water?<user_id>&<date>")]
pub fn get_water(user_id: String, date: String) -> Result<Json<i32>, Status> {
    let connection = &mut db::establish_connection();

    let date = match NaiveDate::from_iso(&date) {
        Ok(date) => date,
        Err(_) => return Err(Status::BadRequest),
    };

    match water_repo::get_by_user_and_date(connection, &user_id, date) {
        Ok(Some(water)) => return Ok(Json(water.amount)),
        Ok(None) => return Ok(Json(0)),
        Err(_) => return Err(Status::InternalServerError),
    }
}

#[put("/water", format = "json", data = "<water>")]
pub fn put_water(water: Json<CreateWaterDto>) -> Result<(), Status> {
    let connection = &mut db::establish_connection();
    let water = water.into_inner();

    try_db!(water_repo::update(connection, water.into()), Option);

    return Ok(());
}

#[cfg(test)]
mod test_get_water {
    use super::*;

    #[test]
    fn test_bad_date() {
        let user_id = "user_2RXbaoxG1wxHXqnCvxFDkDyWazM".to_string();
        let date = "2020-13-01".to_string();

        let response = get_water(user_id, date);

        assert_eq!(response, Err(Status::BadRequest));
    }
}
