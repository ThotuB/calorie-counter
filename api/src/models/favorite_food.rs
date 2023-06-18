use diesel::prelude::*;
use diesel::{pg::PgConnection, result::Error};
use serde::{Deserialize, Serialize};

use crate::schema::favorite_foods;

#[derive(Queryable, Serialize)]
pub struct FavoriteFood {
    pub user_id: String,
    pub food_id: i32,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = favorite_foods)]
pub struct NewFavoriteFood {
    pub user_id: String,
    pub food_id: i32,
}

pub type FavoriteFoodIdsDto = Vec<i32>;

impl FavoriteFood {
    pub fn get_fav_food(conn: &mut PgConnection, uid: &String, fid: i32) -> Option<FavoriteFood> {
        return favorite_foods::table
            .filter(favorite_foods::user_id.eq(uid))
            .filter(favorite_foods::food_id.eq(fid))
            .first::<FavoriteFood>(conn)
            .ok();
    }

    pub fn get_fav_foods_by_user_id(conn: &mut PgConnection, uid: &String) -> FavoriteFoodIdsDto {
        return favorite_foods::table
            .filter(favorite_foods::user_id.eq(uid))
            .load::<FavoriteFood>(conn)
            .expect("Error loading favorite foods by user id")
            .into_iter()
            .map(|fav_food| fav_food.food_id)
            .collect();
    }

    pub fn is_fav_food(conn: &mut PgConnection, uid: &String, fid: i32) -> bool {
        match FavoriteFood::get_fav_food(conn, &uid, fid) {
            Some(_) => true,
            None => false,
        }
    }

    pub fn remove_fav_food(conn: &mut PgConnection, uid: &String, fid: i32) -> bool {
        if FavoriteFood::get_fav_food(conn, &uid, fid).is_none() {
            return false;
        }

        return diesel::delete(
            favorite_foods::table
                .filter(favorite_foods::user_id.eq(uid))
                .filter(favorite_foods::food_id.eq(fid)),
        )
        .execute(conn)
        .is_ok();
    }

    pub fn create_fav_food(
        conn: &mut PgConnection,
        favorite_food: NewFavoriteFood,
    ) -> FavoriteFood {
        return diesel::insert_into(favorite_foods::table)
            .values(favorite_food)
            .get_result(conn)
            .expect("Error saving new favorite food");
    }
}
