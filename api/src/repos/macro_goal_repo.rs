use diesel::prelude::*;
use diesel::PgConnection;

use crate::models::macro_goal::MacroGoal;
use crate::models::macro_goal::NewMacroGoal;
use crate::schema::macro_goals;

pub fn get_macro_goal(connection: &mut PgConnection, uid: &String) -> Option<MacroGoal> {
    return macro_goals::table
        .filter(macro_goals::user_id.eq(uid))
        .first::<MacroGoal>(connection)
        .ok();
}

pub fn create_macro_goal(
    connection: &mut PgConnection,
    new_macro_goal: &NewMacroGoal,
) -> Option<MacroGoal> {
    return diesel::insert_into(macro_goals::table)
        .values(new_macro_goal)
        .get_result(connection)
        .ok();
}

pub fn update_macro_goal(
    connection: &mut PgConnection,
    macro_goal: &MacroGoal,
) -> Option<MacroGoal> {
    return diesel::update(macro_goals::table.find(&macro_goal.user_id))
        .set(macro_goal)
        .get_result(connection)
        .ok();
}
