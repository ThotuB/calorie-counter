use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    db, dto::macro_goals_dtos::UpdateMacrosDto, error, error_message, repos::macro_goal_repo,
    response,
};

pub async fn get_settings(req: Request<&PgPool>) -> Result {
    let user_id = req.param("uid")?;

    let connection = *req.state();

    let macro_goal = match macro_goal_repo::get_by_uid(connection, &user_id).await {
        Ok(Some(macro_goal)) => macro_goal,
        Ok(None) => {
            return Ok(error_message!(
                tide::StatusCode::BadRequest,
                "no-macro-goal",
                "No macro goal found for user"
            ))
        }
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    Ok(response!(StatusCode::Ok, macro_goal))
}

pub async fn put_settings(mut req: Request<&PgPool>) -> Result {
    let update_macros = req.body_json::<UpdateMacrosDto>().await?;

    let connection = *req.state();

    match macro_goal_repo::update(connection, &update_macros.into()).await {
        Ok(_) => (),
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

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
