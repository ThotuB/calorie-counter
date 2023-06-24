use diesel::prelude::*;
use diesel::PgConnection;

use crate::models::food::Food;
use crate::models::food::NewFood;
use crate::schema::food;

pub fn get_food(connection: &mut PgConnection, id: i32) -> Food {
    return food::table
        .filter(food::id.eq(id))
        .first::<Food>(connection)
        .expect("Error loading food");
}

pub fn get_foods_by_user(connection: &mut PgConnection, uid: &String) -> Vec<Food> {
    return food::table
        .filter(food::user_id.eq(uid))
        .load::<Food>(connection)
        .expect("Error loading foods");
}

pub fn get_food_by_barcode(connection: &mut PgConnection, barcode: i64) -> Option<Food> {
    return food::table
        .filter(food::barcode.eq(barcode))
        .first::<Food>(connection)
        .ok();
}

pub fn create_food(connection: &mut PgConnection, new_food: &NewFood) -> Food {
    return diesel::insert_into(food::table)
        .values(new_food)
        .get_result(connection)
        .expect("Error creating food");
}

pub fn delete_food(connection: &mut PgConnection, id: i32) -> bool {
    return diesel::delete(food::table.filter(food::id.eq(id)))
        .execute(connection)
        .is_ok();
}
