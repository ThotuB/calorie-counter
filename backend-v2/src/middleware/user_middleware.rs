use sqlx::PgPool;
use tide::{Middleware, Next, Request};

use crate::{controllers::utils::traits::MapErrorToServerError, error_message, repos::user_repo};

#[derive(Debug, Default, Clone)]
pub struct UserMiddleware;

impl UserMiddleware {
    pub fn new() -> Self {
        Self
    }
}

#[async_trait::async_trait]
impl Middleware<PgPool> for UserMiddleware {
    async fn handle(&self, req: Request<PgPool>, next: Next<'_, PgPool>) -> tide::Result {
        let uid = req.param("uid")?;

        let conn = req.state();

        if !is_valid_uid(uid) {
            return Ok(error_message!(
                tide::StatusCode::BadRequest,
                "invalid-uid-format",
                "Invalid uid format. Format must be UUID v4"
            ));
        }

        let Some(_) = user_repo::get(conn, uid).await.map_err_to_server_error()?
        else {
            return Ok(error_message!(
                tide::StatusCode::NotFound,
                "user-not-found",
                "User not found"
            ));
        };

        let res = next.run(req).await;

        Ok(res)
    }
}

fn is_valid_uid(uid: &str) -> bool {
    regex::Regex::new(r"^user_[a-zA-Z0-9]{27}$")
        .unwrap()
        .is_match(uid)
}
