use diesel::pg::PgConnection;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::schema::water;

#[derive(Queryable, Serialize, Deserialize, AsChangeset)]
#[diesel(table_name = water)]
pub struct Water {
    pub user_id: String,
    pub date: chrono::NaiveDate,
    pub amount: i32,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = water)]
pub struct NewWater {
    pub user_id: String,
    pub date: chrono::NaiveDate,
    pub amount: i32,
}

impl Water {
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
}
