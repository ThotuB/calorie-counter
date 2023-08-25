// use crate::{
//     db,
//     dto::meal_dtos::{CreateMealDto, MealDto},
//     repos::meal_repo,
//     services::usda_food::get_usda_foods_by_ids,
//     try_db,
// };
// use rocket::{http::Status, serde::json::Json};
//
// #[get("/meals?<user_id>&<day>")]
// pub async fn get_meals(user_id: String, day: String) -> Json<Vec<MealDto>> {
//     let connection = &mut db::establish_connection();
//
//     let day = chrono::NaiveDate::parse_from_str(&day, "%Y-%m-%d").unwrap();
//
//     let meals = meal_repo::get_by_user_and_date(connection, &user_id, day);
//
//     if meals.is_empty() {
//         return Json(vec![]);
//     }
//
//     let ids = meals.iter().map(|m| m.food_id).collect::<Vec<i32>>();
//     let foods = get_usda_foods_by_ids(ids).await.unwrap();
//
//     return Json(
//         std::iter::zip(meals, foods)
//             .map(|(meal, food)| MealDto::from_meal(meal, food))
//             .collect::<Vec<_>>(),
//     );
// }
//
// #[post("/meals", format = "json", data = "<meal>")]
// pub fn post_meal(meal: Json<CreateMealDto>) -> Result<(), Status> {
//     let connection = &mut db::establish_connection();
//     let meal = meal.into_inner();
//
//     try_db!(meal_repo::create(connection, meal.into()));
//
//     return Ok(());
// }
//
// #[delete("/meals/<meal_id>")]
// pub fn delete_meal(meal_id: i32) -> Result<(), Status> {
//     let connection = &mut db::establish_connection();
//
//     try_db!(meal_repo::delete(connection, meal_id));
//
//     return Ok(());
// }
