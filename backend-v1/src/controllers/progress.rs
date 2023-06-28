use rocket::{http::Status, serde::json::Json};

use crate::{db, dto::progress_dtos::ProgressDto, repos::meal_repo, try_db, utils::FromISO};

#[get("/progress?<user_id>&<date_from>&<date_to>")]
pub async fn get_progress(
    user_id: String,
    date_from: String,
    date_to: String,
) -> Result<Json<ProgressDto>, Status> {
    let date_from = match chrono::NaiveDate::from_iso(&date_from) {
        Ok(date) => date,
        Err(_) => return Err(Status::BadRequest),
    };
    let date_to = match chrono::NaiveDate::from_iso(&date_to) {
        Ok(date) => date,
        Err(_) => return Err(Status::BadRequest),
    };

    let connection = &mut db::establish_connection();

    let meals = try_db!(
        meal_repo::get_total_macro_intake_per_day_between_dates_for_user(
            connection, &user_id, &date_from, &date_to,
        )
    );

    if meals.is_empty() {
        return Ok(Json(ProgressDto::empty()));
    }

    let averages_per_meal_type = try_db!(
        meal_repo::get_average_macro_intake_per_meal_type_between_dates_for_user(
            connection, &user_id, &date_from, &date_to,
        )
    );

    let data = ProgressDto::new(meals, averages_per_meal_type);

    return Ok(Json(data));
}
