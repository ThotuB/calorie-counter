use diesel::prelude::*;
use diesel::{pg::PgConnection, result::Error};
use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

use crate::schema::settings;

#[derive(DbEnum, Debug, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[ExistingTypePath = "crate::schema::sql_types::System"]
pub enum System {
    Metric,
    Imperial,
}

#[derive(DbEnum, Debug, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[ExistingTypePath = "crate::schema::sql_types::WaterSize"]
pub enum WaterSize {
    Glass,
    Bottle,
}

#[derive(DbEnum, Debug, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[ExistingTypePath = "crate::schema::sql_types::WeightGoal"]
pub enum WeightGoal {
    Lose,
    Maintain,
    Gain,
}

#[derive(Queryable, Serialize)]
pub struct Settings {
    pub user_id: String,
    pub weight_goal: WeightGoal,
    pub age: i32,
    pub height: i32,
    pub weight: i32,
    pub system: System,
    pub water_goal: i32,
    pub water_size: WaterSize,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = settings)]
pub struct NewSettings {
    pub user_id: String,
    pub weight_goal: WeightGoal,
    pub age: i32,
    pub height: i32,
    pub weight: i32,
    pub system: System,
}

impl Settings {
    pub fn get_settings(connection: &mut PgConnection, uid: String) -> Option<Settings> {
        return settings::table
            .filter(settings::user_id.eq(uid))
            .first::<Settings>(connection)
            .ok();
    }

    pub fn create_settings(connection: &mut PgConnection, new_settings: NewSettings) -> Settings {
        return diesel::insert_into(settings::table)
            .values(new_settings)
            .get_result(connection)
            .expect("Error creating settings");
    }
}
