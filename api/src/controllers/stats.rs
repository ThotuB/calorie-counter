use chrono::Datelike;
use rocket::serde::json::Json;

use crate::{
    db,
    dto::stats_dtos::StatsDto,
    repos::{macro_goal_repo, meal_repo},
    services::usda_food::get_usda_foods_by_ids,
};

#[get("/stats?<user_id>&<day>")]
pub async fn get_stats(user_id: String, day: String) -> Json<StatsDto> {
    let connection = &mut db::establish_connection();

    let today = chrono::NaiveDate::parse_from_str(&day, "%Y-%m-%d").unwrap();

    let meals = meal_repo::get_meals_by_user_id_and_date(connection, &user_id, today);

    let last_week = today - chrono::Duration::days(7);
    let yesterday = today - chrono::Duration::days(1);
    let nutrients_last_week =
        meal_repo::get_meals_by_user_id_between_dates(connection, &user_id, &last_week, &yesterday);

    let mut calories_last_week: [i32; 7] = [0; 7];
    for nutrients_per_day in nutrients_last_week {
        calories_last_week
            [6 - (yesterday.ordinal0() - nutrients_per_day.date.ordinal0()) as usize] =
            nutrients_per_day.calories;
    }

    let macro_goal = macro_goal_repo::get_macro_goal(connection, &user_id).unwrap();

    if meals.is_empty() {
        return Json(StatsDto::empty(today, &macro_goal, calories_last_week));
    }

    let ids = meals.iter().map(|m| m.food_id).collect::<Vec<i32>>();
    let foods = get_usda_foods_by_ids(ids).await.unwrap();

    return Json(StatsDto::new(today, &macro_goal, foods, calories_last_week));
}
