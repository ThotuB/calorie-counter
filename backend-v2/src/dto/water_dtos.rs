use serde::{Deserialize, Serialize};

use crate::models::water::Water;

#[derive(Serialize)]
pub struct WaterAmountDto {
    pub amount: i32,
}

#[derive(Deserialize)]
pub struct CreateWaterDto {
    pub user_id: String,
    pub date: chrono::NaiveDate,
    pub amount: i32,
}

impl Into<Water> for CreateWaterDto {
    fn into(self) -> Water {
        Water {
            user_id: self.user_id,
            date: self.date,
            amount: self.amount,
        }
    }
}
