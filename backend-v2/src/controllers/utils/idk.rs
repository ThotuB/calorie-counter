use chrono::NaiveDate;

pub trait FromISO {
    fn from_iso(iso: &str) -> Result<Self, chrono::ParseError>
    where
        Self: Sized;
}

impl FromISO for NaiveDate {
    fn from_iso(iso: &str) -> Result<Self, chrono::ParseError> {
        NaiveDate::parse_from_str(iso, "%Y-%m-%dT%T%.3fZ")
    }
}

#[macro_export]
macro_rules! parse_iso {
    ($expression:expr) => {
        match crate::controllers::utils::idk::FromISO::from_iso($expression) {
            Ok(date) => date,
            Err(_) => {
                return Ok(error_message!(
                    tide::StatusCode::BadRequest,
                    "invalid-date-format",
                    "Invalid date format. Format must be ISO 8601 ( YYYY-MM-DDTHH:MM:SS.fffZ )"
                ))
            }
        }
    };
}

#[macro_export]
macro_rules! try_db {
    ($expression:expr, Option) => {
        match $expression {
            Ok(Some(row)) => row,
            Ok(None) => return Err(tide::StatusCode::NotFound),
            Err(_) => return Err(tide::StatusCode::InternalServerError),
        }
    };
    ($expression:expr) => {
        match $expression {
            Ok(rows) => rows,
            Err(_) => return Err(tide::StatusCode::InternalServerError),
        }
    };
    ($expression:expr, tide::StatusCode) => {
        match $expression {
            Ok(rows) => rows,
            Err(_) => return tide::StatusCode::InternalServerError,
        }
    };
}
