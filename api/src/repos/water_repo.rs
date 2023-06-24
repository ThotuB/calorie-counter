use diesel::prelude::*;
use diesel::PgConnection;

use crate::{
    models::water::{NewWater, Water},
    schema::water,
};

pub fn get_water(
    connection: &mut PgConnection,
    uid: &String,
    day: chrono::NaiveDate,
) -> Option<Water> {
    return water::table
        .filter(water::user_id.eq(uid))
        .filter(water::date.eq(day))
        .first::<Water>(connection)
        .ok();
}

pub fn get_water_by_user_id(connection: &mut PgConnection, uid: &String) -> Vec<Water> {
    return water::table
        .filter(water::user_id.eq(uid))
        .load::<Water>(connection)
        .expect("Error loading water by user id");
}

pub fn update_water(connection: &mut PgConnection, updated_water: NewWater) -> Water {
    return diesel::insert_into(water::table)
        .values(&updated_water)
        .on_conflict((water::user_id, water::date))
        .do_update()
        .set(water::amount.eq(updated_water.amount))
        .get_result(connection)
        .expect("Error updating water");
}

pub fn create_water(connection: &mut PgConnection, water: NewWater) -> Water {
    return diesel::insert_into(water::table)
        .values(water)
        .get_result(connection)
        .expect("Error saving new water");
}
