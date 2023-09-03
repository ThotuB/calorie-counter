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

impl From<CreateWaterDto> for Water {
    fn from(val: CreateWaterDto) -> Self {
        Water {
            user_id: val.user_id,
            date: val.date,
            amount: val.amount,
        }
    }
}
