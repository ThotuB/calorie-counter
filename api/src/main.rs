use controllers::*;

#[macro_use]
extern crate rocket;
extern crate diesel;
extern crate serde;

mod constants;
mod controllers;
mod cors;
mod db;
mod dto;
mod impls;
mod models;
mod schema;
mod services;

#[launch]
fn rocket() -> _ {
    rocket::build().attach(cors::CORS).mount(
        "/api",
        routes![
            favorite_foods::get_favorite_foods,
            favorite_foods::get_favorite_food,
            favorite_foods::post_favorite_food,
            favorite_foods::delete_favorite_food,
            meals::get_meals,
            meals::post_meal,
            meals::delete_meal,
            daily::get_daily,
            stats::get_stats,
            progress::get_progress,
            water::get_water,
            water::put_water,
            account::post_account,
            settings::get_settings,
            settings::adjust_macros,
        ],
    )
}
