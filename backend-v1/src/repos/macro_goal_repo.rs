use diesel::prelude::*;

use crate::models::macro_goal::MacroGoal;
use crate::models::macro_goal::NewMacroGoal;
use crate::schema::macro_goals;

pub fn get_by_uid(conn: &mut PgConnection, uid: &String) -> QueryResult<Option<MacroGoal>> {
    return macro_goals::table
        .filter(macro_goals::user_id.eq(uid))
        .first::<MacroGoal>(conn)
        .optional();
}

pub fn create(conn: &mut PgConnection, new_macro_goal: &NewMacroGoal) -> QueryResult<MacroGoal> {
    return diesel::insert_into(macro_goals::table)
        .values(new_macro_goal)
        .get_result(conn);
}

pub fn update(conn: &mut PgConnection, macro_goal: &MacroGoal) -> QueryResult<Option<MacroGoal>> {
    return diesel::update(macro_goals::table.find(&macro_goal.user_id))
        .set(macro_goal)
        .get_result(conn)
        .optional();
}
