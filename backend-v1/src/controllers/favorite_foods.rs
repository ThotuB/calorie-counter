use rocket::{http::Status, serde::json::Json};

use crate::{
    db,
    dto::{favorite_food_dtos::CreateFavoriteFoodDto, food_dtos::FoodDto},
    models::source_enum::Source,
    repos::favorite_food_repo,
    services::usda_food::get_usda_foods_by_ids,
    try_db,
};

#[get("/favorite-foods?<user_id>")]
pub async fn get_favorite_foods(user_id: String) -> Result<Json<Vec<FoodDto>>, Status> {
    let connection = &mut db::establish_connection();

    let ids = try_db!(favorite_food_repo::get_by_user(connection, &user_id));

    if ids.is_empty() {
        return Ok(Json(vec![]));
    }

    let foods = try_db!(get_usda_foods_by_ids(ids).await);

    return Ok(Json(foods));
}

#[get("/favorite-food?<user_id>&<food_id>&<source>")]
pub fn is_favorite_food(user_id: String, food_id: i32, source: String) -> Result<(), Status> {
    let connection = &mut db::establish_connection();

    try_db!(
        favorite_food_repo::get(connection, &user_id, food_id, &Source::from(&source)),
        Option
    );

    return Ok(());
}

#[post("/favorite-foods", format = "json", data = "<food>")]
pub fn post_favorite_food(food: Json<CreateFavoriteFoodDto>) -> Status {
    let connection = &mut db::establish_connection();
    let food = food.into_inner();

    try_db!(favorite_food_repo::create(connection, food.into()), Status);

    return Status::Ok;
}

#[delete("/favorite-foods", format = "json", data = "<food>")]
pub fn delete_favorite_food(food: Json<CreateFavoriteFoodDto>) -> Result<(), Status> {
    let connection = &mut db::establish_connection();

    try_db!(favorite_food_repo::delete(
        connection,
        &food.user_id,
        food.food_id,
        &food.source,
    ));

    return Ok(());
}
