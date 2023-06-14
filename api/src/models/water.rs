use diesel::pg::PgConnection;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::schema::water;

#[derive(Queryable, Serialize)]
pub struct Water {
    pub user_id: i32,
    pub date: chrono::NaiveDate,
    pub amount: i32,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = water)]
pub struct NewWater {
    pub user_id: i32,
    pub date: chrono::NaiveDate,
}

// impl Water {
//     pub fn get_water(connection: &mut PgConnection, uid: i32, day: String) -> Water {
//         return water::table
//             .filter(water::user_id.eq(uid))
//             .filter(water::date.eq(day))
//             .first::<Water>(connection)
//             .expect("Error loading water");
//     }
//
//     pub fn get_water_by_user_id(connection: &mut PgConnection, uid: i32) -> Vec<Water> {
//         return water::table
//             .filter(water::user_id.eq(uid))
//             .load::<Water>(connection)
//             .expect("Error loading water by user id");
//     }
//
//     pub fn update_water(connection: &mut PgConnection, uid: i32, day: String, amount: i32) -> Water {
//         let water = Water::get_water(connection, uid, day);
//         let new_water = NewWater {
//             user_id: uid,
//             date: water.date,
//         };
//         diesel::delete(water::table.filter(water::user_id.eq(uid)).filter(water::date.eq(day)))
//             .execute(connection)
//             .expect("Error deleting water");
//         return Water::create_water(connection, new_water);
//     }
//
//     pub fn create_water(connection: &mut PgConnection, water: NewWater) -> Water {
//         return diesel::insert_into(water::table)
//             .values(water)
//             .get_result(connection)
//             .expect("Error saving new water");
//     }
// }
