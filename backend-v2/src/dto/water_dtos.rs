use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct WaterAmountDto {
    pub amount: i32,
}
