use rocket::serde::json::Json;

use crate::{db, dto::progress_dtos::ProgressDto, impls::FromISO, repos::meal_repo};

#[get("/progress?<user_id>&<date_from>&<date_to>")]
pub async fn get_progress(
    user_id: String,
    date_from: String,
    date_to: String,
) -> Json<ProgressDto> {
    let connection = &mut db::establish_connection();

    let date_from = chrono::NaiveDate::from_iso(&date_from);
    let date_to = chrono::NaiveDate::from_iso(&date_to);

    let meals =
        meal_repo::get_meals_by_user_id_between_dates(connection, &user_id, &date_from, &date_to);

    if meals.is_empty() {
        return Json(ProgressDto::empty());
    }

    let averages_per_meal_type = meal_repo::get_averages_per_meal_type_by_user_id_between_dates(
        connection, &user_id, &date_from, &date_to,
    );

    let data = ProgressDto::new(meals, averages_per_meal_type);

    println!("{:#?}", data);

    return Json(data);
}
