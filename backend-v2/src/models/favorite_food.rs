use serde::{Deserialize, Serialize};

use super::enums::Source;

#[derive(Debug, Serialize, Deserialize)]
pub struct FavoriteFood {
    pub user_id: String,
    pub food_id: i32,
    pub source: Source,
}
