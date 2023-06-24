use diesel::prelude::*;

use crate::schema::favorite_foods;

use super::source_enum::Source;

#[derive(Queryable)]
#[diesel(table_name = favorite_foods)]
pub struct FavoriteFood {
    pub user_id: String,
    pub food_id: i32,
    pub source: Source,
}

#[derive(Insertable)]
#[diesel(table_name = favorite_foods)]
pub struct NewFavoriteFood {
    pub user_id: String,
    pub food_id: i32,
    pub source: Source,
}
