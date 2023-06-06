#[macro_use]
extern crate rocket;

mod db;

#[launch]
fn rocket() -> _ {
    let connection = &mut db::establish_connection();

    rocket::build().mount("/api", routes![])
}
