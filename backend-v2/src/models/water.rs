use sqlx::FromRow;

#[derive(FromRow)]
pub struct WaterAmount {
    pub amount: i32,
}

#[derive(FromRow)]
pub struct WaterAverage {
    pub amount: f32,
}

#[derive(FromRow)]
pub struct Water {
    pub user_id: String,
    pub date: chrono::NaiveDate,
    pub amount: i32,
}
