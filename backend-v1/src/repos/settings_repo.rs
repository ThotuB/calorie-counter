use diesel::prelude::*;
use diesel::PgConnection;

use crate::models::settings::NewSettings;
use crate::{models::settings::Settings, schema::settings};

pub fn get_by_uid(conn: &mut PgConnection, uid: &String) -> QueryResult<Option<Settings>> {
    return settings::table
        .filter(settings::user_id.eq(uid))
        .first::<Settings>(conn)
        .optional();
}

pub fn create(conn: &mut PgConnection, new_settings: &NewSettings) -> QueryResult<Settings> {
    return diesel::insert_into(settings::table)
        .values(new_settings)
        .get_result(conn);
}
