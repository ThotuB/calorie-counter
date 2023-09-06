app.at("/api/v2").nest({
    let mut api = tide::with_state(db::create_pool().await);

    api.at("/user/:uid").nest({
        let mut user = tide::with_state(db::create_pool().await);

        user.with(UserMiddleware::new());

        user.at("/meals").nest({
            let mut meals = tide::with_state(db::create_pool().await);

            meals.at("/:date").get(meals::get_meals);
            meals.at("/recent").get(meals::get_recent_meals);
            meals.at("/").post(meals::post_meal);
            meals.at("/:mid").delete(meals::delete_meal);

            meals
        });
        / * ... * /
        user;
    });
    / * ... * /
    api
});

"api/v2/user/:uid/meals/:date"