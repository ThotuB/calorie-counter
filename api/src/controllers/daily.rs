use rocket::serde::json::Json;

use crate::{
    db,
    dto::{daily_dtos::DailyDto, meal_dtos::MealDto},
    models::{macro_goal::MacroGoal, meal::Meal},
    services::usda_food::get_usda_foods_by_ids,
};

#[get("/daily?<user_id>&<day>")]
pub async fn get_daily(user_id: String, day: String) -> Json<DailyDto> {
    let connection = &mut db::establish_connection();

    let day = chrono::NaiveDate::parse_from_str(&day, "%Y-%m-%d").unwrap();

    let meals = Meal::get_meals_by_user_id_and_date(connection, &user_id, day);
    let macro_goal = MacroGoal::get_macro_goal(connection, &user_id).unwrap();

    if meals.is_empty() {
        return Json(DailyDto::empty(day, macro_goal));
    }

    let ids = meals.iter().map(|m| m.food_id).collect::<Vec<i32>>();

    let foods = get_usda_foods_by_ids(ids).await.unwrap();

    return Json(DailyDto::new(
        day,
        macro_goal,
        std::iter::zip(meals, foods)
            .map(|(meal, food)| MealDto::from_meal(meal, food))
            .collect::<Vec<_>>(),
    ));
}
