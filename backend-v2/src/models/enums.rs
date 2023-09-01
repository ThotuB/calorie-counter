use std::str::FromStr;

#[derive(Debug, Type, Serialize, Deserialize, PartialEq)]
#[sqlx(type_name = "source", rename_all = "snake_case")]
#[serde(rename_all = "snake_case")]
pub enum Source {
    User,
    Usda,
}

pub struct ParseSourceError;

impl FromStr for Source {
    type Err = ParseSourceError;

    fn from_str(source: &str) -> Result<Self, Self::Err> {
        match source {
            "user" => Ok(Source::User),
            "usda" => Ok(Source::Usda),
            _ => Err(ParseSourceError),
        }
    }
}
