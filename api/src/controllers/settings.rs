use rocket::serde::json::Json;

use crate::{
    db,
    models::settings::{NewSettings, Settings},
};

#[post("/settings", format = "json", data = "<settings>")]
pub fn post_settings(settings: Json<NewSettings>) -> Json<Settings> {
    let connection = &mut db::establish_connection();

    return Json(Settings::create_settings(connection, settings.into_inner()));
}
