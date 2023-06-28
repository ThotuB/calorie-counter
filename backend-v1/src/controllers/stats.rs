use chrono::Datelike;
use rocket::{http::Status, serde::json::Json};

use crate::{
    db,
    dto::stats_dtos::StatsDto,
    repos::{macro_goal_repo, meal_repo},
    services::usda_food::get_usda_foods_by_ids,
    try_db,
    utils::FromISO,
};

#[get("/stats?<user_id>&<day>")]
pub async fn get_stats(user_id: String, day: String) -> Result<Json<StatsDto>, Status> {
    let today = match chrono::NaiveDate::from_iso(&day) {
        Ok(date) => date,
        Err(_) => return Err(Status::BadRequest),
    };

    let connection = &mut db::establish_connection();

    let meals = meal_repo::get_by_user_and_date(connection, &user_id, today);

    let last_week = today - chrono::Duration::days(7);
    let yesterday = today - chrono::Duration::days(1);
    let nutrients_last_week = try_db!(
        meal_repo::get_total_macro_intake_per_day_between_dates_for_user(
            connection, &user_id, &last_week, &yesterday,
        )
    );

    let mut calories_last_week: [i32; 7] = [0; 7];
    for nutrients_per_day in nutrients_last_week {
        let day_index = 6 - (yesterday.ordinal0() - nutrients_per_day.date.ordinal0());
        calories_last_week[day_index as usize] = nutrients_per_day.calories;
    }

    let macro_goal = try_db!(macro_goal_repo::get_by_uid(connection, &user_id), Option);

    if meals.is_empty() {
        return Ok(Json(StatsDto::empty(
            today,
            &macro_goal,
            calories_last_week,
        )));
    }

    let ids = meals.iter().map(|m| m.food_id).collect::<Vec<i32>>();
    let foods = match get_usda_foods_by_ids(ids).await {
        Ok(foods) => foods,
        Err(_) => return Err(Status::InternalServerError),
    };

    return Ok(Json(StatsDto::new(
        today,
        &macro_goal,
        foods,
        calories_last_week,
    )));
}
