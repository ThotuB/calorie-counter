use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

#[derive(DbEnum, Debug, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
#[ExistingTypePath = "crate::schema::sql_types::Source"]
pub enum Source {
    User,
    Usda,
}
