// use crate::{
//     db,
//     models::{macro_goal::NewMacroGoal, settings::NewSettings},
//     repos::{macro_goal_repo, settings_repo},
//     try_db,
// };
//
// pub fn post_account(account: Json<NewSettings>) -> Result<(), Status> {
//     let connection = &mut db::establish_connection();
//     let account = account.into_inner();
//
//     try_db!(macro_goal_repo::create(
//         connection,
//         &NewMacroGoal::from(&account)
//     ));
//     try_db!(settings_repo::create(connection, &account));
//
//     return Ok(());
// }
