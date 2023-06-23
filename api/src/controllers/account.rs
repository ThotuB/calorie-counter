use rocket::{http::Status, serde::json::Json};

use crate::{
    db,
    models::{
        macro_goal::{MacroGoal, NewMacroGoal},
        settings::{NewSettings, Settings},
    },
};

#[post("/account", format = "json", data = "<account>")]
pub fn post_account(account: Json<NewSettings>) -> Status {
    let connection = &mut db::establish_connection();
    let account = account.into_inner();

    MacroGoal::create_macro_goal(connection, &NewMacroGoal::from_settings(&account));
    Settings::create_settings(connection, &account);

    return Status::Ok;
}
