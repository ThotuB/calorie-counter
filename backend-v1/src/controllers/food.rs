use rocket::{http::Status, serde::json::Json};

use crate::{db, dto::food_dtos::FoodDto, models::food::NewFood, repos::food_repo, try_db};

#[get("/food/<id>")]
pub fn get_food(id: i32) -> Result<Json<FoodDto>, Status> {
    let connection = &mut db::establish_connection();

    let food = try_db!(food_repo::get_by_id(connection, id), Option);

    return Ok(Json(FoodDto::from(food)));
}

#[get("/food/user/<user_id>")]
pub fn get_foods_by_user(user_id: String) -> Result<Json<Vec<FoodDto>>, Status> {
    let connection = &mut db::establish_connection();

    let foods = try_db!(food_repo::get_by_user(connection, &user_id));

    return Ok(Json(foods.into_iter().map(|f| FoodDto::from(f)).collect()));
}

#[get("/food/barcode/<barcode_id>")]
pub fn get_food_by_barcode(barcode_id: i64) -> Result<Json<FoodDto>, Status> {
    let connection = &mut db::establish_connection();

    let food = try_db!(
        food_repo::get_food_by_barcode(connection, barcode_id),
        Option
    );

    return Ok(Json(FoodDto::from(food)));
}

#[post("/food", format = "json", data = "<new_food>")]
pub fn post_food(new_food: Json<NewFood>) -> Result<Json<FoodDto>, Status> {
    let connection = &mut db::establish_connection();

    let new_food = try_db!(food_repo::create(connection, &new_food.into_inner()));

    return Ok(Json(FoodDto::from(new_food)));
}

#[delete("/food/<id>")]
pub fn delete_food(id: i32) -> Result<(), Status> {
    let connection = &mut db::establish_connection();

    try_db!(food_repo::delete(connection, id));

    return Ok(());
}
