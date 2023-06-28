use diesel::prelude::*;
use diesel::PgConnection;

use crate::models::source_enum::Source;
use crate::{
    models::favorite_food::{FavoriteFood, NewFavoriteFood},
    schema::favorite_foods,
};

pub fn get_by_user(conn: &mut PgConnection, uid: &String) -> QueryResult<Vec<i32>> {
    return favorite_foods::table
        .filter(favorite_foods::user_id.eq(uid))
        .select(favorite_foods::food_id)
        .load::<i32>(conn);
}

// pub fn get_fav_user_created_foods_by_user_id(conn: &mut PgConnection, uid: &String) -> Vec<i32> {
//     return favorite_foods::table
//         .filter(favorite_foods::user_id.eq(uid))
//         .filter(favorite_foods::source.eq(Source::User))
//         .inner_join(food::table)
//         .load::<i32>(conn)
//         .expect("Error loading favorite foods by user id");
// }

pub fn get_by_user_with_usda_source(
    conn: &mut PgConnection,
    uid: &String,
) -> QueryResult<Vec<i32>> {
    return favorite_foods::table
        .filter(favorite_foods::user_id.eq(uid))
        .filter(favorite_foods::source.eq(Source::Usda))
        .select(favorite_foods::food_id)
        .load::<i32>(conn);
}

pub fn get(
    conn: &mut PgConnection,
    uid: &String,
    fid: i32,
    source: &Source,
) -> QueryResult<Option<FavoriteFood>> {
    return favorite_foods::table
        .filter(favorite_foods::user_id.eq(uid))
        .filter(favorite_foods::food_id.eq(fid))
        .filter(favorite_foods::source.eq(source))
        .first::<FavoriteFood>(conn)
        .optional();
}

pub fn delete(
    conn: &mut PgConnection,
    uid: &String,
    fid: i32,
    source: &Source,
) -> QueryResult<usize> {
    return diesel::delete(
        favorite_foods::table
            .filter(favorite_foods::user_id.eq(uid))
            .filter(favorite_foods::food_id.eq(fid))
            .filter(favorite_foods::source.eq(source)),
    )
    .execute(conn);
}

pub fn create(
    conn: &mut PgConnection,
    favorite_food: NewFavoriteFood,
) -> QueryResult<FavoriteFood> {
    return diesel::insert_into(favorite_foods::table)
        .values(favorite_food)
        .get_result::<FavoriteFood>(conn);
}

pub fn create_many(
    conn: &mut PgConnection,
    favorite_foods: Vec<NewFavoriteFood>,
) -> QueryResult<Vec<FavoriteFood>> {
    return diesel::insert_into(favorite_foods::table)
        .values(favorite_foods)
        .get_results::<FavoriteFood>(conn);
}

#[cfg(test)]
mod tests {
    use super::*;

    fn setup(conn: &mut PgConnection) {
        create_many(
            conn,
            vec![
                NewFavoriteFood {
                    user_id: String::from("test_user1"),
                    food_id: 1,
                    source: Source::User,
                },
                NewFavoriteFood {
                    user_id: String::from("test_user1"),
                    food_id: 2,
                    source: Source::Usda,
                },
                NewFavoriteFood {
                    user_id: String::from("test_user2"),
                    food_id: 3,
                    source: Source::User,
                },
            ],
        )
        .expect("Error creating favorite foods");
    }

    #[test]
    fn test_get_by_user_ok() {
        let mut conn = crate::db::establish_test_connection();
        setup(&mut conn);

        let result = get_by_user(&mut conn, &String::from("test_user1"))
            .expect("Error getting favorite foods by user id");

        assert_eq!(result.len(), 2);
        assert_eq!(result[0], 1);
        assert_eq!(result[1], 2);
    }

    #[test]
    fn test_get_by_user_not_ok() {
        let mut conn = crate::db::establish_test_connection();
        setup(&mut conn);

        let result = get_by_user(&mut conn, &String::from("test_user3"))
            .expect("Error getting favorite foods by user id");

        assert_eq!(result.len(), 0);
    }

    #[test]
    fn test_get_by_user_with_usda_source_ok() {
        let mut conn = crate::db::establish_test_connection();
        setup(&mut conn);

        let result = get_by_user_with_usda_source(&mut conn, &String::from("test_user1"))
            .expect("Error getting favorite foods by user id");

        assert_eq!(result.len(), 1);
        assert_eq!(result[0], 2);
    }
}
