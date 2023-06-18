use rocket::serde::json::Json;

use crate::{
    db,
    dto::food::Food,
    models::favorite_food::{FavoriteFood, NewFavoriteFood},
    services::usda_food::get_usda_foods_by_ids,
};

#[get("/favorite-foods?<user_id>")]
pub async fn get_favorite_foods(user_id: String) -> Json<Vec<Food>> {
    let connection = &mut db::establish_connection();

    let ids = FavoriteFood::get_fav_foods_by_user_id(connection, &user_id);

    println!("GET - favorite_foods: {:?}", ids);

    if ids.is_empty() {
        return Json(vec![]);
    }

    let foods = get_usda_foods_by_ids(ids).await.unwrap();

    return Json(foods);
}

#[get("/favorite-food?<user_id>&<food_id>")]
pub fn get_favorite_food(user_id: String, food_id: i32) -> Json<bool> {
    let connection = &mut db::establish_connection();

    let result = FavoriteFood::is_fav_food(connection, &user_id, food_id);

    return Json(result);
}

#[post("/favorite-foods", format = "json", data = "<food>")]
pub fn post_favorite_food(food: Json<NewFavoriteFood>) -> Json<FavoriteFood> {
    let connection = &mut db::establish_connection();

    return Json(FavoriteFood::create_fav_food(connection, food.into_inner()));
}

#[delete("/favorite-foods", format = "json", data = "<food>")]
pub fn delete_favorite_food(food: Json<NewFavoriteFood>) -> Json<bool> {
    let connection = &mut db::establish_connection();

    return Json(FavoriteFood::remove_fav_food(
        connection,
        &food.user_id,
        food.food_id,
    ));
}
