use chrono::NaiveDate;

pub trait FromISO {
    fn from_iso(iso: &String) -> Result<Self, chrono::ParseError>
    where
        Self: Sized;
}

impl FromISO for NaiveDate {
    fn from_iso(iso: &String) -> Result<Self, chrono::ParseError> {
        NaiveDate::parse_from_str(&iso, "%Y-%m-%dT%T%.3fZ")
    }
}

pub type StatusResult<T> = Result<T, rocket::http::Status>;

#[macro_export]
macro_rules! try_db {
    ($expression:expr, Option) => {
        match $expression {
            Ok(Some(row)) => row,
            Ok(None) => return Err(Status::NotFound),
            Err(_) => return Err(Status::InternalServerError),
        }
    };
    ($expression:expr) => {
        match $expression {
            Ok(rows) => rows,
            Err(_) => return Err(Status::InternalServerError),
        }
    };
    ($expression:expr, Status) => {
        match $expression {
            Ok(rows) => rows,
            Err(_) => return Status::InternalServerError,
        }
    };
}
