use diesel::prelude::*;
use diesel::PgConnection;

use crate::models::food::Food;
use crate::models::food::NewFood;
use crate::schema::food;

pub fn get_by_id(conn: &mut PgConnection, id: i32) -> QueryResult<Option<Food>> {
    return food::table
        .filter(food::id.eq(id))
        .first::<Food>(conn)
        .optional();
}

pub fn get_by_user(conn: &mut PgConnection, uid: &String) -> QueryResult<Vec<Food>> {
    return food::table.filter(food::user_id.eq(uid)).load::<Food>(conn);
}

pub fn get_food_by_barcode(conn: &mut PgConnection, barcode: i64) -> QueryResult<Option<Food>> {
    return food::table
        .filter(food::barcode.eq(barcode))
        .first::<Food>(conn)
        .optional();
}

pub fn create(conn: &mut PgConnection, new_food: &NewFood) -> QueryResult<Food> {
    return diesel::insert_into(food::table)
        .values(new_food)
        .get_result::<Food>(conn);
}

pub fn delete(conn: &mut PgConnection, id: i32) -> QueryResult<usize> {
    return diesel::delete(food::table.filter(food::id.eq(id))).execute(conn);
}
