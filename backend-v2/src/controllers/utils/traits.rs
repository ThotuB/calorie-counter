use chrono::NaiveDate;

pub trait ParseISO {
    fn parse_iso(iso: &str) -> Result<Self, chrono::ParseError>
    where
        Self: Sized;
}

impl ParseISO for NaiveDate {
    fn parse_iso(iso: &str) -> Result<Self, chrono::ParseError> {
        NaiveDate::parse_from_str(iso, "%Y-%m-%dT%T%.3fZ")
    }
}

pub trait ParseYMD {
    fn parse_ymd(ymd: &str) -> Result<Self, chrono::ParseError>
    where
        Self: Sized;
}

impl ParseYMD for NaiveDate {
    fn parse_ymd(ymd: &str) -> Result<Self, chrono::ParseError> {
        NaiveDate::parse_from_str(ymd, "%Y-%m-%d")
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
