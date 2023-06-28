use diesel::prelude::*;
use diesel::PgConnection;

use crate::{
    models::water::{NewWater, Water},
    schema::water,
};

pub fn get_by_user_and_date(
    conn: &mut PgConnection,
    uid: &String,
    day: chrono::NaiveDate,
) -> QueryResult<Option<Water>> {
    return water::table
        .filter(water::user_id.eq(uid))
        .filter(water::date.eq(day))
        .first::<Water>(conn)
        .optional();
}

pub fn get_by_user(conn: &mut PgConnection, uid: &String) -> Vec<Water> {
    return water::table
        .filter(water::user_id.eq(uid))
        .load::<Water>(conn)
        .expect("Error loading water by user id");
}

pub fn get_by_user_between_dates(
    conn: &mut PgConnection,
    uid: &String,
    start: chrono::NaiveDate,
    end: chrono::NaiveDate,
) -> Vec<Water> {
    return water::table
        .filter(water::user_id.eq(uid))
        .filter(water::date.ge(start))
        .filter(water::date.le(end))
        .load::<Water>(conn)
        .expect("Error loading water by user id between dates");
}

pub fn get_average_amount_by_user_between_dates(
    conn: &mut PgConnection,
    uid: &String,
    start_date: &chrono::NaiveDate,
    end_date: &chrono::NaiveDate,
) -> f32 {
    return water::table
        .filter(water::user_id.eq(uid))
        .filter(water::date.ge(start_date))
        .filter(water::date.le(end_date))
        .select(diesel::dsl::sql::<diesel::sql_types::Float>(
            "CAST(AVG(amount) AS REAL)",
        ))
        .first::<f32>(conn)
        .expect("Error loading water by user id and date");
}

pub fn update(conn: &mut PgConnection, updated_water: NewWater) -> QueryResult<Option<Water>> {
    return diesel::insert_into(water::table)
        .values(&updated_water)
        .on_conflict((water::user_id, water::date))
        .do_update()
        .set(water::amount.eq(updated_water.amount))
        .get_result::<Water>(conn)
        .optional();
}
