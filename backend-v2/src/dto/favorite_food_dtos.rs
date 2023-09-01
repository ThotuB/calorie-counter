use serde::Deserialize;

use crate::models::{enums::Source, favorite_food::FavoriteFood};

#[derive(Deserialize)]
pub struct CreateFavoriteFoodDto {
    pub user_id: String,
    pub food_id: i32,
    pub source: Source,
}

impl Into<FavoriteFood> for CreateFavoriteFoodDto {
    fn into(self) -> FavoriteFood {
        return FavoriteFood {
            user_id: self.user_id,
            food_id: self.food_id,
            source: self.source,
        };
    }
}
