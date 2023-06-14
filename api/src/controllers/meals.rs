use crate::{
    db,
    dto::meal::MealDto,
    models::meal::{Meal, NewMeal},
    services::usda_food::get_usda_foods_by_ids,
};
use rocket::serde::json::Json;

#[get("/meals?<user_id>&<day>")]
pub async fn get_meals(user_id: i32, day: String) -> Json<Vec<MealDto>> {
    let connection = &mut db::establish_connection();

    let day = chrono::NaiveDate::parse_from_str(&day, "%Y-%m-%d").unwrap();

    let meals = Meal::get_meals_by_user_id_and_date(connection, user_id, day);

    if meals.is_empty() {
        return Json(vec![]);
    }

    let ids = meals.iter().map(|m| m.food_id).collect::<Vec<i32>>();
    let foods = get_usda_foods_by_ids(ids).await.unwrap();

    return Json(
        std::iter::zip(meals, foods)
            .map(|(meal, food)| MealDto::from_meal(meal, food))
            .collect::<Vec<_>>(),
    );
}

#[post("/meals", format = "json", data = "<meal>")]
pub fn post_meal(meal: Json<NewMeal>) -> Json<Meal> {
    let connection = &mut db::establish_connection();

    return Json(Meal::create_meal(connection, meal.into_inner()));
}

#[delete("/meals/<meal_id>")]
pub fn delete_meal(meal_id: i32) -> Json<bool> {
    let connection = &mut db::establish_connection();

    return Json(Meal::remove_meal(connection, meal_id));
}
