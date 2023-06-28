use serde::Deserialize;

use crate::models::{favorite_food::NewFavoriteFood, source_enum::Source};

#[derive(Deserialize)]
pub struct CreateFavoriteFoodDto {
    pub user_id: String,
    pub food_id: i32,
    pub source: Source,
}

impl Into<NewFavoriteFood> for CreateFavoriteFoodDto {
    fn into(self) -> NewFavoriteFood {
        return NewFavoriteFood {
            user_id: self.user_id,
            food_id: self.food_id,
            source: self.source,
        };
    }
}
