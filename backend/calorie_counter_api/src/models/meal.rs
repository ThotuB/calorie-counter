use diesel::pg::PgConnection;
use diesel::prelude::*;
use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

use crate::schema::meals;

#[derive(DbEnum, Debug, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[ExistingTypePath = "crate::schema::sql_types::MealType"]
pub enum MealType {
    Breakfast,
    Lunch,
    Dinner,
    Snack,
}

#[derive(DbEnum, Debug, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[ExistingTypePath = "crate::schema::sql_types::PortionSize"]
pub enum PortionSize {
    Serving,
    Gram,
    Ml,
}

#[derive(Queryable, Serialize)]
pub struct Meal {
    pub id: i32,
    pub user_id: i32,
    pub food_id: i32,
    pub meal_type: MealType,
    pub date: chrono::NaiveDate,
    pub portions: f32,
    pub portion_size: PortionSize,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = meals)]
pub struct NewMeal {
    pub user_id: i32,
    pub food_id: i32,
    pub meal_type: MealType,
    pub date: chrono::NaiveDate,
    pub portions: f32,
    pub portion_size: PortionSize,
}

impl Meal {
    pub fn get_meal(connection: &mut PgConnection, mid: i32) -> Meal {
        return meals::table
            .filter(meals::id.eq(mid))
            .first::<Meal>(connection)
            .expect("Error loading meal");
    }

    pub fn get_meals_by_user_id(connection: &mut PgConnection, uid: i32) -> Vec<Meal> {
        return meals::table
            .filter(meals::user_id.eq(uid))
            .load::<Meal>(connection)
            .expect("Error loading meals by user id");
    }

    pub fn get_meals_by_user_id_and_date(
        connection: &mut PgConnection,
        uid: i32,
        date: chrono::NaiveDate,
    ) -> Vec<Meal> {
        return meals::table
            .filter(meals::user_id.eq(uid))
            .filter(meals::date.eq(date))
            .load::<Meal>(connection)
            .expect("Error loading meals by user id and date");
    }

    pub fn remove_meal(connection: &mut PgConnection, mid: i32) -> bool {
        if Meal::get_meal(connection, mid).user_id == 0 {
            return false;
        }

        return diesel::delete(meals::table.filter(meals::id.eq(mid)))
            .execute(connection)
            .is_ok();
    }

    pub fn create_meal(connection: &mut PgConnection, meal: NewMeal) -> Meal {
        return diesel::insert_into(meals::table)
            .values(meal)
            .get_result(connection)
            .expect("Error saving new meal");
    }
}
