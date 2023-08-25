use std::env;

use dotenvy::dotenv;
use sqlx::{Connection, PgConnection};

pub async fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    PgConnection::connect(&database_url)
        .await
        .expect(&format!("Error connecting to {}", database_url))
}
