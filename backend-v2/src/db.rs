use std::env;

use dotenvy::dotenv;
use sqlx::{postgres::PgPoolOptions, PgPool};

pub async fn create_pool() -> PgPool {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .unwrap_or_else(|_| panic!("Error connecting to {database_url}"))
}
