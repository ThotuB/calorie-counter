// use rocket::{http::Status, serde::json::Json};
//
// use crate::{
//     db,
//     dto::{daily_dtos::DailyDto, meal_dtos::MealDto},
//     repos::{macro_goal_repo, meal_repo},
//     services::usda_food::get_usda_foods_by_ids,
//     try_db,
//     utils::FromISO,
// };
//
// #[get("/daily?<user_id>&<day>")]
// pub async fn get_daily(user_id: String, day: String) -> Result<Json<DailyDto>, Status> {
//     let day = match chrono::NaiveDate::from_iso(&day) {
//         Ok(date) => date,
//         Err(_) => return Err(Status::BadRequest),
//     };
//
//     let connection = &mut db::establish_connection();
//
//     let meals = meal_repo::get_by_user_and_date(connection, &user_id, day);
//     let macro_goal = try_db!(macro_goal_repo::get_by_uid(connection, &user_id), Option);
//
//     if meals.is_empty() {
//         return Ok(Json(DailyDto::empty(day, macro_goal)));
//     }
//
//     let ids = meals.iter().map(|m| m.food_id).collect::<Vec<i32>>();
//
//     let foods = try_db!(get_usda_foods_by_ids(ids).await);
//
//     return Ok(Json(DailyDto::new(
//         day,
//         macro_goal,
//         std::iter::zip(meals, foods)
//             .map(|(meal_repo, food)| MealDto::from_meal(meal_repo, food))
//             .collect::<Vec<_>>(),
//     )));
// }
