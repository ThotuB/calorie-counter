use rocket::{http::Status, serde::json::Json};

use crate::{
    db,
    models::{macro_goal::NewMacroGoal, settings::NewSettings},
    repos::{macro_goal_repo, settings_repo},
};

#[post("/account", format = "json", data = "<account>")]
pub fn post_account(account: Json<NewSettings>) -> Status {
    let connection = &mut db::establish_connection();
    let account = account.into_inner();

    macro_goal_repo::create_macro_goal(connection, &NewMacroGoal::from(&account));
    settings_repo::create_settings(connection, &account);

    return Status::Ok;
}
