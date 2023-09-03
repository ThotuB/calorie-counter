use serde::Deserialize;

use crate::models::{enums::Source, favorite_food::FavoriteFood};

#[derive(Deserialize)]
pub struct CreateFavoriteFoodDto {
    pub user_id: String,
    pub food_id: i32,
    pub source: Source,
}

impl From<CreateFavoriteFoodDto> for FavoriteFood {
    fn from(val: CreateFavoriteFoodDto) -> Self {
        FavoriteFood {
            user_id: val.user_id,
            food_id: val.food_id,
            source: val.source,
        }
    }
}
