// use rocket::{http::Status, serde::json::Json};
//
// use crate::{
//     db, dto::macro_goals_dtos::UpdateMacrosDto, models::macro_goal::MacroGoal,
//     repos::macro_goal_repo, try_db,
// };
//
// #[get("/settings/<user_id>")]
// pub fn get_settings(user_id: String) -> Result<Json<MacroGoal>, Status> {
//     let connection = &mut db::establish_connection();
//
//     let macro_goal = try_db!(macro_goal_repo::get_by_uid(connection, &user_id), Option);
//
//     Ok(Json(macro_goal))
// }
//
// #[put("/settings/adjust-macros", format = "json", data = "<update_macros>")]
// pub fn adjust_macros(update_macros: Json<UpdateMacrosDto>) -> Result<Json<MacroGoal>, Status> {
//     let connection = &mut db::establish_connection();
//     let update_macros = update_macros.into_inner();
//
//     let macro_goal = try_db!(
//         macro_goal_repo::update(connection, &update_macros.into()),
//         Option
//     );
//
//     Ok(Json(macro_goal))
// }
//
// // #[cfg(test)]
// // mod get_settings_tests {
// //     use super::*;
// //
// //     #[test]
// //     fn test_get_settings_ok() {
// //         let user_id = "user_2RXbaoxG1wxHXqnCvxFDkDyWazM".to_string();
// //
// //         get_settings(user_id);
// //     }
// // }
