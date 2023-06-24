use rocket::{http::Status, serde::json::Json};

use crate::{
    db,
    dto::{favorite_food_dtos::CreateFavoriteFoodDto, food_dtos::FoodDto},
    repos::favorite_food_repo,
    services::usda_food::get_usda_foods_by_ids,
};

#[get("/favorite-foods?<user_id>")]
pub async fn get_favorite_foods(user_id: String) -> Json<Vec<FoodDto>> {
    let connection = &mut db::establish_connection();

    let ids = favorite_food_repo::get_fav_foods_by_user_id(connection, &user_id);

    if ids.is_empty() {
        return Json(vec![]);
    }

    let foods = get_usda_foods_by_ids(ids).await.unwrap();

    return Json(foods);
}

#[get("/favorite-food?<user_id>&<food_id>")]
pub fn get_favorite_food(user_id: String, food_id: i32) -> Json<bool> {
    let connection = &mut db::establish_connection();

    let result = favorite_food_repo::is_fav_food(connection, &user_id, food_id);

    return Json(result);
}

#[post("/favorite-foods", format = "json", data = "<food>")]
pub fn post_favorite_food(food: Json<CreateFavoriteFoodDto>) -> Status {
    let connection = &mut db::establish_connection();
    let food = food.into_inner();

    favorite_food_repo::create_fav_food(connection, food.into());

    return Status::Ok;
}

#[delete("/favorite-foods", format = "json", data = "<food>")]
pub fn delete_favorite_food(food: Json<CreateFavoriteFoodDto>) -> Json<bool> {
    let connection = &mut db::establish_connection();

    return Json(favorite_food_repo::remove_fav_food(
        connection,
        &food.user_id,
        food.food_id,
    ));
}
