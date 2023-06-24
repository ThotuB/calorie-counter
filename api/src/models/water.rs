use diesel::prelude::*;

use crate::schema::water;

#[derive(Queryable, AsChangeset)]
#[diesel(table_name = water)]
pub struct Water {
    pub user_id: String,
    pub date: chrono::NaiveDate,
    pub amount: i32,
}

#[derive(Insertable)]
#[diesel(table_name = water)]
pub struct NewWater {
    pub user_id: String,
    pub date: chrono::NaiveDate,
    pub amount: i32,
}
