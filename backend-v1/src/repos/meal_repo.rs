use diesel::{dsl::sql, pg::PgConnection};
use diesel::{prelude::*, sql_types};

use crate::models::meal::{Meal, MealType, NewMeal};
use crate::schema::meals;

pub fn get_by_id(conn: &mut PgConnection, mid: i32) -> QueryResult<Option<Meal>> {
    return meals::table
        .filter(meals::id.eq(mid))
        .first::<Meal>(conn)
        .optional();
}

pub fn get_by_user(conn: &mut PgConnection, uid: &String) -> QueryResult<Vec<Meal>> {
    return meals::table
        .filter(meals::user_id.eq(uid))
        .load::<Meal>(conn);
}

pub fn get_by_user_and_date(
    conn: &mut PgConnection,
    uid: &String,
    date: chrono::NaiveDate,
) -> Vec<Meal> {
    return meals::table
        .filter(meals::user_id.eq(uid))
        .filter(meals::date.eq(date))
        .load::<Meal>(conn)
        .expect("Error loading meals by user id and date");
}

pub fn get_total_macro_intake_per_day_between_dates_for_user(
    conn: &mut PgConnection,
    uid: &String,
    start_date: &chrono::NaiveDate,
    end_date: &chrono::NaiveDate,
) -> QueryResult<Vec<MealGroup>> {
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
        .load::<MealGroup>(conn);
}

pub fn get_average_macro_intake_per_meal_type_between_dates_for_user(
    conn: &mut PgConnection,
    uid: &String,
    start_date: &chrono::NaiveDate,
    end_date: &chrono::NaiveDate,
) -> QueryResult<Vec<MealAveragePerMealType>> {
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
        .load::<MealAveragePerMealType>(conn);
}

pub fn get_averages_by_user_id_between_dates(
    conn: &mut PgConnection,
    uid: &String,
    start_date: &chrono::NaiveDate,
    end_date: &chrono::NaiveDate,
) -> QueryResult<Option<MealAverage>> {
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
        .first::<MealAverage>(conn)
        .optional();
}

pub fn delete(conn: &mut PgConnection, mid: i32) -> QueryResult<usize> {
    return diesel::delete(meals::table.filter(meals::id.eq(mid))).execute(conn);
}

pub fn create(conn: &mut PgConnection, meal: NewMeal) -> QueryResult<Meal> {
    return diesel::insert_into(meals::table)
        .values(meal)
        .get_result::<Meal>(conn);
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
