use rocket::{http::Status, serde::json::Json};

use crate::{db, dto::food_dtos::FoodDto, models::food::NewFood, repos::food_repo};

#[get("/food/<id>")]
pub fn get_food(id: i32) -> Json<FoodDto> {
    let connection = &mut db::establish_connection();

    let food = food_repo::get_food(connection, id);

    return Json(FoodDto::from(food));
}

#[get("/food?<user_id>")]
pub fn get_foods_by_user(user_id: String) -> Json<Vec<FoodDto>> {
    let connection = &mut db::establish_connection();

    let foods = food_repo::get_foods_by_user(connection, &user_id);

    return Json(foods.into_iter().map(|f| FoodDto::from(f)).collect());
}

#[get("/food?<barcode_id>")]
pub fn get_food_by_barcode(barcode_id: i64) -> Json<FoodDto> {
    let connection = &mut db::establish_connection();

    let food = food_repo::get_food_by_barcode(connection, barcode_id);

    return Json(FoodDto::from(food.unwrap()));
}

#[post("/food", format = "json", data = "<new_food>")]
pub fn post_food(new_food: Json<NewFood>) -> Status {
    let connection = &mut db::establish_connection();

    food_repo::create_food(connection, &new_food.into_inner());

    return Status::Created;
}

#[delete("/food/<id>")]
pub fn delete_food(id: i32) -> Status {
    let connection = &mut db::establish_connection();

    match food_repo::delete_food(connection, id) {
        true => return Status::Ok,
        false => return Status::NotFound,
    }
}
