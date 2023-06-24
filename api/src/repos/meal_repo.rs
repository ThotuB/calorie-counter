use diesel::{dsl::sql, pg::PgConnection};
use diesel::{prelude::*, sql_types};

use crate::models::meal::{Meal, MealType, NewMeal};
use crate::schema::meals;

pub fn get_meal(connection: &mut PgConnection, mid: i32) -> Option<Meal> {
    return meals::table
        .filter(meals::id.eq(mid))
        .first::<Meal>(connection)
        .ok();
}

pub fn get_meals_by_user_id(connection: &mut PgConnection, uid: &String) -> Vec<Meal> {
    return meals::table
        .filter(meals::user_id.eq(uid))
        .load::<Meal>(connection)
        .expect("Error loading meals by user id");
}

pub fn get_meals_by_user_id_and_date(
    connection: &mut PgConnection,
    uid: &String,
    date: chrono::NaiveDate,
) -> Vec<Meal> {
    return meals::table
        .filter(meals::user_id.eq(uid))
        .filter(meals::date.eq(date))
        .load::<Meal>(connection)
        .expect("Error loading meals by user id and date");
}

pub fn get_meals_by_user_id_between_dates(
    connection: &mut PgConnection,
    uid: &String,
    start_date: &chrono::NaiveDate,
    end_date: &chrono::NaiveDate,
) -> Vec<MealGroup> {
    return meals::table
        .filter(meals::user_id.eq(uid))
        .filter(meals::date.ge(start_date))
        .filter(meals::date.le(end_date))
        .group_by(meals::date)
        .select((
            meals::date,
            sql::<sql_types::Integer>("CAST(SUM(calories) AS INTEGER)"),
            sql::<sql_types::Float>("SUM(protein)"),
            sql::<sql_types::Float>("SUM(carbs)"),
            sql::<sql_types::Float>("SUM(fat)"),
        ))
        .order_by(meals::date.asc())
        .load::<MealGroup>(connection)
        .expect("Error loading meals by user id and date");
}

pub fn get_averages_per_meal_type_by_user_id_between_dates(
    connection: &mut PgConnection,
    uid: &String,
    start_date: &chrono::NaiveDate,
    end_date: &chrono::NaiveDate,
) -> Vec<MealAveragePerMealType> {
    return meals::table
        .filter(meals::user_id.eq(uid))
        .filter(meals::date.ge(start_date))
        .filter(meals::date.le(end_date))
        .group_by(meals::meal_type)
        .select((
            meals::meal_type,
            sql::<sql_types::Integer>("CAST(AVG(calories) AS INTEGER)"),
            sql::<sql_types::Float>("CAST(AVG(protein) AS REAL)"),
            sql::<sql_types::Float>("CAST(AVG(carbs) AS REAL)"),
            sql::<sql_types::Float>("CAST(AVG(fat) AS REAL)"),
        ))
        .load::<MealAveragePerMealType>(connection)
        .expect("Error loading averages per meal type by user id and date");
}

pub fn get_averages_by_user_id_between_dates(
    connection: &mut PgConnection,
    uid: &String,
    start_date: &chrono::NaiveDate,
    end_date: &chrono::NaiveDate,
) -> MealAverage {
    return meals::table
        .filter(meals::user_id.eq(uid))
        .filter(meals::date.ge(start_date))
        .filter(meals::date.le(end_date))
        .group_by(meals::date)
        .select((
            sql::<sql_types::Integer>("CAST(SUM(calories) AS INTEGER)"),
            sql::<sql_types::Float>("CAST(SUM(protein) AS REAL)"),
            sql::<sql_types::Float>("CAST(SUM(carbs) AS REAL)"),
            sql::<sql_types::Float>("CAST(SUM(fat) AS REAL)"),
        ))
        .select((
            sql::<sql_types::Integer>("CAST(AVG(calories) AS INTEGER)"),
            sql::<sql_types::Float>("CAST(AVG(protein) AS REAL)"),
            sql::<sql_types::Float>("CAST(AVG(carbs) AS REAL)"),
            sql::<sql_types::Float>("CAST(AVG(fat) AS REAL)"),
        ))
        .first::<MealAverage>(connection)
        .expect("Error loading averages by user id and date");
}

pub fn remove_meal(connection: &mut PgConnection, mid: i32) -> bool {
    if self::get_meal(connection, mid).is_none() {
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

#[derive(Queryable, Debug)]
pub struct MealGroup {
    pub date: chrono::NaiveDate,
    pub calories: i32,
    pub protein: f32,
    pub carbs: f32,
    pub fat: f32,
}

impl From<(chrono::NaiveDate, i32, f32, f32, f32)> for MealGroup {
    fn from(
        (date, calories, protein, carbs, fat): (chrono::NaiveDate, i32, f32, f32, f32),
    ) -> Self {
        MealGroup {
            date,
            calories,
            protein,
            carbs,
            fat,
        }
    }
}

#[derive(Queryable, Debug)]
pub struct MealAveragePerMealType {
    pub meal_type: MealType,
    pub calories: i32,
    pub protein: f32,
    pub carbs: f32,
    pub fat: f32,
}

impl From<(MealType, i32, f32, f32, f32)> for MealAveragePerMealType {
    fn from((meal_type, calories, protein, carbs, fat): (MealType, i32, f32, f32, f32)) -> Self {
        MealAveragePerMealType {
            meal_type,
            calories,
            protein,
            carbs,
            fat,
        }
    }
}

#[derive(Queryable, Debug)]
pub struct MealAverage {
    pub calories: i32,
    pub protein: f32,
    pub carbs: f32,
    pub fat: f32,
}

impl From<(i32, f32, f32, f32)> for MealAverage {
    fn from((calories, protein, carbs, fat): (i32, f32, f32, f32)) -> Self {
        MealAverage {
            calories,
            protein,
            carbs,
            fat,
        }
    }
}
