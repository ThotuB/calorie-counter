use chrono::NaiveDate;

pub trait FromISO {
    fn from_iso(iso: &String) -> Self;
}

impl FromISO for NaiveDate {
    fn from_iso(iso: &String) -> Self {
        NaiveDate::parse_from_str(&iso, "%Y-%m-%dT%T%.3fZ").unwrap()
    }
}
