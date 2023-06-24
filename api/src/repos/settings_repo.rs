use diesel::prelude::*;
use diesel::PgConnection;

use crate::models::settings::NewSettings;
use crate::{models::settings::Settings, schema::settings};

pub fn get_settings(connection: &mut PgConnection, uid: &String) -> Option<Settings> {
    return settings::table
        .filter(settings::user_id.eq(uid))
        .first::<Settings>(connection)
        .ok();
}

pub fn create_settings(connection: &mut PgConnection, new_settings: &NewSettings) -> Settings {
    return diesel::insert_into(settings::table)
        .values(new_settings)
        .get_result(connection)
        .expect("Error creating settings");
}
