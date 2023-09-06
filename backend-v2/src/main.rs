use controllers::*;
use middleware::{log_middleware::LogMiddleware, user_middleware::UserMiddleware};
use services::usda_food::*;
use sqlx::PgPool;
use tide::{
    utils::{After, Before},
    Request, Response,
};

#[macro_use]
extern crate tide;
#[macro_use]
extern crate serde;
#[macro_use]
extern crate sqlx;

mod constants;
mod controllers;
mod db;
mod dto;
mod middleware;
mod models;
mod repos;
mod services;

#[async_std::main]
async fn main() -> tide::Result<()> {
    femme::start();

    start_server().await?;

    Ok(())
}

async fn start_server() -> tide::Result<()> {
    let mut app = tide::new();

    app.with(LogMiddleware::new());
    app.with(After(|res: Response| async move {
        if let Some(error) = res.error() {
            return Ok(error_message!(
                res.status(),
                error.type_name().unwrap_or("unknown-error-type"),
                &format!("{error:?}")
            ));
        }

        Ok(res)
    }));

    app.at("/").get(|_| async { Ok("Running!") });

    // app.at("/favicon.ico")
    // .serve_file("./resources/favicon.ico")?;

    app.at("/api/v2").nest({
        let mut api = tide::with_state(db::create_pool().await);
        // let mut api = tide::with_state(db::create_pool().await);

        api.at("/user/:uid").nest({
            let mut user = tide::with_state(db::create_pool().await);

            user.with(UserMiddleware::new());

            user.at("/water").nest({
                let mut water = tide::with_state(db::create_pool().await);

                water.at("/:date").get(water::get_water);
                water.at("/").put(water::put_water);

                water
            });
            user.at("/favorite-foods").nest({
                let mut favorite_foods = tide::with_state(db::create_pool().await);

                favorite_foods
                    .at("/")
                    .get(favorite_foods::get_favorite_foods)
                    .post(favorite_foods::post_favorite_food);
                favorite_foods
                    .at("/:source/:fid")
                    .get(favorite_foods::is_favorite_food)
                    .delete(favorite_foods::delete_favorite_food);

                favorite_foods
            });
            user.at("/meals").nest({
                let mut meals = tide::with_state(db::create_pool().await);

                meals.at("/:date").get(meals::get_meals);
                meals.at("/recent").get(meals::get_recent_meals);
                meals.at("/").post(meals::post_meal);
                meals.at("/:mid").delete(meals::delete_meal);

                meals
            });
            user.at("/stats").nest({
                let mut stats = tide::with_state(db::create_pool().await);

                stats.at("/daily/:date").get(stats::get_stats);
                stats
                    .at("/progress/:date_from/:date_to")
                    .get(stats::get_progress);

                stats
            });
            user.at("/daily").nest({
                let mut daily = tide::with_state(db::create_pool().await);

                daily.at("/:date").get(daily::get_daily);

                daily
            });
            user.at("/account").nest({
                let mut account = tide::with_state(db::create_pool().await);

                account.at("/").post(account::post_account);

                account
            });
            user.at("/settings").nest({
                let mut settings = tide::with_state(db::create_pool().await);

                settings
                    .at("/")
                    .get(settings::get_macro_goal)
                    .put(settings::put_macro_goal);

                settings
            });

            user
        });
        api.at("/food").nest({
            let mut food = tide::with_state(db::create_pool().await);

            food.at("/:id").get(food::get_food);
            food.at("/user/:uid").get(food::get_foods_by_user);
            food.at("/barcode/:barcode_id")
                .get(food::get_food_by_barcode);
            food.at("/").post(food::post_food);
            food.at("/:id").delete(food::delete_food);

            food
        });

        api
    });

    app.at("*").all(handle_404);

    app.listen("0.0.0.0:3000").await?;

    Ok(())
}

async fn handle_404(_: tide::Request<()>) -> tide::Result {
    Ok(error_message!(
        tide::StatusCode::NotFound,
        "route-not-found",
        "Route not found."
    ))
}
