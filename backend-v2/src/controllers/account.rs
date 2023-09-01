use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    db, error,
    models::settings::Settings,
    repos::{macro_goal_repo, settings_repo},
    response,
};

pub async fn post_account(mut req: Request<&PgPool>) -> Result {
    let settings = req.body_json::<Settings>().await?;

    let connection = *req.state();

    match macro_goal_repo::create(connection, &(&settings).into()).await {
        Ok(_) => (),
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    match settings_repo::create(connection, &settings).await {
        Ok(_) => (),
        Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
    };

    return Ok(response!(StatusCode::Ok));
}
