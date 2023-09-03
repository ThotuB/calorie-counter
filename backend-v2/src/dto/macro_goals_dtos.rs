use serde::Deserialize;

use crate::models::macro_goal::MacroGoal;

#[derive(Debug, Deserialize, Clone)]
pub struct UpdateMacrosDto {
    pub user_id: String,
    pub calories: i32,
    pub percent_carbs: f32,
    pub percent_protein: f32,
    pub percent_fat: f32,
}

impl From<UpdateMacrosDto> for MacroGoal {
    fn from(val: UpdateMacrosDto) -> Self {
        MacroGoal {
            user_id: val.user_id,
            calories: val.calories,
            carbs: (val.calories as f32 * val.percent_carbs / 4.0) as i32,
            protein: (val.calories as f32 * val.percent_protein / 4.0) as i32,
            fat: (val.calories as f32 * val.percent_fat / 9.0) as i32,
            percent_carbs: val.percent_carbs,
            percent_protein: val.percent_protein,
            percent_fat: val.percent_fat,
        }
    }
}
