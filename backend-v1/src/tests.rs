use std::env;
use std::panic;

use diesel::RunQueryDsl;
use diesel::{Connection, PgConnection};
use dotenvy::dotenv;

use crate::db::establish_test_connection;

pub fn run_test<T>(test: T) -> ()
where
    T: FnOnce() -> () + panic::UnwindSafe,
{
    let result = panic::catch_unwind(|| test());

    assert!(result.is_ok())
}

pub struct TestContext {
    db_name: String,
}

impl TestContext {
    fn new(db_name: &str) -> Self {
        // connect to the test database
        let conn = &mut establish_test_connection();

        // Create a new database for the test
        diesel::sql_query(&format!("CREATE DATABASE {}", db_name))
            .execute(conn)
            .expect(&format!("Could not create database {}", db_name));

        Self {
            db_name: db_name.to_string(),
        }
    }
}

impl Drop for TestContext {
    fn drop(&mut self) {
        // connect to the test database
        dotenv().ok();

        let database_url = env::var("TEST_DATABASE_URL").expect("TEST_DATABASE_URL must be set");
        let conn = &mut PgConnection::establish(&database_url)
            .expect(&format!("Cannot connect to {}", database_url));

        // Drop the test database
        diesel::sql_query(&format!("DROP DATABASE {}", self.db_name))
            .execute(conn)
            .expect(&format!("Could not drop database {}", self.db_name));
    }
}
