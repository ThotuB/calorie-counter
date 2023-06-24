use serde::Deserialize;

use crate::models::water::NewWater;

#[derive(Deserialize)]
pub struct CreateWaterDto {
    pub user_id: String,
    pub date: chrono::NaiveDate,
    pub amount: i32,
}

impl Into<NewWater> for CreateWaterDto {
    fn into(self) -> NewWater {
        return NewWater {
            user_id: self.user_id,
            date: self.date,
            amount: self.amount,
        };
    }
}
