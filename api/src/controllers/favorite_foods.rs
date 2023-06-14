use rocket::serde::json::Json;

use crate::{
    db,
    models::favorite_food::{FavoriteFood, FavoriteFoodIdsDto, NewFavoriteFood},
};

#[get("/favorite-foods?<user_id>")]
pub fn get_favorite_foods(user_id: i32) -> Json<FavoriteFoodIdsDto> {
    let connection = &mut db::establish_connection();

    return Json(FavoriteFood::get_fav_foods_by_user_id(connection, user_id));
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
        food.user_id,
        food.food_id,
    ));
}
