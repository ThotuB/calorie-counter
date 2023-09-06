use std::{env, str::FromStr};

use dotenvy::dotenv;
use sqlx::{
    postgres::{PgConnectOptions, PgPoolOptions},
    ConnectOptions, PgPool,
};

pub async fn create_pool() -> PgPool {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let options = PgConnectOptions::from_str(&database_url).unwrap();
    // .disable_statement_logging();

    PgPoolOptions::new()
        .max_connections(5)
        .connect_with(options)
        .await
        .unwrap_or_else(|_| panic!("Error connecting to {database_url}"))
}
