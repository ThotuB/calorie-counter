use sqlx::PgPool;
use tide::{Request, Result, StatusCode};

use crate::{
    models::settings::Settings,
    repos::{macro_goal_repo, settings_repo},
    response,
};

use super::utils::traits::MapErrorToServerError;

pub async fn post_account(mut req: Request<PgPool>) -> Result {
    let settings = req.body_json::<Settings>().await?;

    let connection = req.state();

    macro_goal_repo::create(connection, &(&settings).into())
        .await
        .map_err_to_server_error()?;

    settings_repo::create(connection, &settings)
        .await
        .map_err_to_server_error()?;

    Ok(response!(StatusCode::Ok))
}
