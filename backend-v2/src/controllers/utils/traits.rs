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

pub trait MapErrorToServerError<T> {
    fn map_err_to_server_error(self) -> Result<T, tide::Error>;
}

impl<T> MapErrorToServerError<T> for Result<T, sqlx::Error> {
    fn map_err_to_server_error(self) -> Result<T, tide::Error> {
        self.map_err(|e| tide::Error::new(tide::StatusCode::InternalServerError, e))
    }
}

impl<T> MapErrorToServerError<T> for Result<T, reqwest::Error> {
    fn map_err_to_server_error(self) -> Result<T, tide::Error> {
        self.map_err(|e| tide::Error::new(tide::StatusCode::InternalServerError, e))
    }
}
