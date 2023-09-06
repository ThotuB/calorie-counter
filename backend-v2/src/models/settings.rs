use serde::{Deserialize, Serialize};

#[derive(Type, Debug, Serialize, Deserialize)]
#[sqlx(type_name = "gender", rename_all = "snake_case")]
#[serde(rename_all = "snake_case")]
pub enum Gender {
    Male,
    Female,
}

#[derive(Type, Debug, Serialize, Deserialize)]
#[sqlx(type_name = "system", rename_all = "snake_case")]
#[serde(rename_all = "snake_case")]
pub enum System {
    Metric,
    Imperial,
}

#[derive(Type, Debug, Serialize, Deserialize)]
#[sqlx(type_name = "water_size", rename_all = "snake_case")]
#[serde(rename_all = "snake_case")]
pub enum WaterSize {
    Glass,
    Bottle,
}

#[derive(Type, Debug, Serialize, Deserialize)]
#[sqlx(type_name = "weight_goal", rename_all = "snake_case")]
#[serde(rename_all = "snake_case")]
pub enum WeightGoal {
    Lose,
    Maintain,
    Gain,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Settings {
    pub user_id: String,
    pub weight_goal: WeightGoal,
    pub gender: Gender,
    pub age: i32,
    pub height: i32,
    pub weight: i32,
    pub system: System,
    pub water_goal: i32,
    pub water_size: WaterSize,
}
