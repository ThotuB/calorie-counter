use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    dto::macro_goals_dtos::UpdateMacrosDto, error_message, repos::macro_goal_repo, response,
};

use super::utils::traits::MapErrorToServerError;

pub async fn get_settings(req: Request<PgPool>) -> Result {
    let user_id = req.param("uid")?;

    let connection = req.state();

    let Some(macro_goal) = macro_goal_repo::get_by_uid(connection, user_id).await.map_err_to_server_error()? else {
        return Ok(error_message!(
            tide::StatusCode::BadRequest,
            "no-macro-goal",
            "No macro goal found for user"));
    };

    Ok(response!(StatusCode::Ok, macro_goal))
}

pub async fn put_settings(mut req: Request<PgPool>) -> Result {
    let update_macros = req.body_json::<UpdateMacrosDto>().await?;

    let connection = req.state();

    macro_goal_repo::update(connection, &update_macros.into())
        .await
        .map_err_to_server_error()?;

    Ok(response!(StatusCode::Ok))
}

// #[cfg(test)]
// mod get_settings_tests {
//     use super::*;
//
//     #[test]
//     fn test_get_settings_ok() {
//         let user_id = "user_2RXbaoxG1wxHXqnCvxFDkDyWazM".to_string();
//
//         get_settings(user_id);
//     }
// }
