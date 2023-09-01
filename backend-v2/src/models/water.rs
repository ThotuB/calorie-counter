use sqlx::FromRow;

#[derive(FromRow)]
pub struct Water {
    pub user_id: String,
    pub date: chrono::NaiveDate,
    pub amount: i32,
}
