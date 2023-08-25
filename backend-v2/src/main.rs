use controllers::water::get_water;

mod controllers;
mod db;
mod dto;
mod models;
mod repos;

#[async_std::main]
async fn main() -> tide::Result<()> {
    //     let water_routes = Router::new()
    //         .route("/:id", get(get_water))
    //         .route("/", post(|| async { "post water!" }));
    //
    //     let favorite_food_routes = Router::new()
    //         .route("/", get(|| async { "get favorite foods!" }))
    //         .route("/:id", get(|| async { "is favorite food!" }))
    //         .route("/", post(|| async { "post favorite food!" }))
    //         .route("/:id", delete(|| async { "delete favorite food!" }));
    //
    //     let meals_routes = Router::new()
    //         .route("/", get(|| async { "get meals!" }))
    //         .route("/", post(|| async { "post meals!" }))
    //         .route("/:id", delete(|| async { "delete meals!" }));
    //
    //     let stats_rotues = Router::new()
    //         .route("/daily/:date", get(|| async { "get daily stats!" }))
    //         .route("/progress/", get(|| async { "get progress!" }));
    //
    //     let account_routes = Router::new().route("/", get(|| async { "get account!" }));
    //
    //     let settings_routes = Router::new()
    //         .route("/", get(|| async { "get settings!" }))
    //         .route("/adjust-macros", post(|| async { "adjust macros!" }));
    //
    //     let daily_routes = Router::new().route("/", get(|| async { "get daily!" }));
    //
    //     let user_routes = Router::new()
    //         .nest("/water", water_routes)
    //         .nest("/favorite-foods", favorite_food_routes)
    //         .nest("/meals", meals_routes)
    //         .nest("/stats", stats_rotues)
    //         .nest("/daily", daily_routes)
    //         .nest("/account", account_routes)
    //         .nest("/settings", settings_routes);
    //
    //     let food_routes = Router::new()
    //         .route("/:id", get(|| async { "get food!" }))
    //         .route("/user/:id", get(|| async { "get foods by user!" }))
    //         .route("/barcode/:id", get(|| async { "get food by barcode!" }))
    //         .route("/", post(|| async { "post food!" }))
    //         .route("/:id", delete(|| async { "delete food!" }));
    //
    //     let api = Router::new()
    //         .nest("/user/:uid", user_routes)
    //         .nest("/food", food_routes);
    //
    //     let app = Router::new().nest("/api", api);
    //
    //     axum::Server::bind(&"0.0.0.0:6000".parse().unwrap())
    //         .serve(app.into_make_service())
    //         .await
    //         .unwrap();
    femme::start();

    let mut app = tide::new();

    app.with(tide::log::LogMiddleware::new());

    app.at("/").get(|_| async { Ok("Running!") });

    // app.at("/favicon.ico")
    // .serve_file("./resources/favicon.ico")?;

    app.at("/api/v2").nest({
        // let mut api = tide::with_state(db::establish_connection().await);
        let mut api = tide::new();

        api.at("/user/:uid").nest({
            let mut user = tide::new();

            user.at("/water").nest({
                let mut water = tide::new();

                water.at("/:date").get(get_water);

                water
            });

            user
        });

        api
    });

    app.listen("0.0.0.0:6000").await?;

    Ok(())
}
