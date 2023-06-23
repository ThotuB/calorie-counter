use rocket::serde::json::Json;

use crate::{db, dto::macro_goals_dtos::UpdateMacrosDto, models::macro_goal::MacroGoal};

#[get("/settings/<user_id>")]
pub fn get_settings(user_id: String) -> Json<MacroGoal> {
    let connection = &mut db::establish_connection();

    let macros = MacroGoal::get_macro_goal(connection, &user_id);

    return Json(macros.expect("No macro goal found"));
}

#[put("/settings/adjust-macros", format = "json", data = "<macros>")]
pub fn adjust_macros(macros: Json<UpdateMacrosDto>) -> Json<bool> {
    let connection = &mut db::establish_connection();
    let macros = macros.into_inner();

    let macros = MacroGoal::update_macro_goal(connection, &macros.into());

    return Json(macros.is_some());
}
