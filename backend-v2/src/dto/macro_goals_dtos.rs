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

impl Into<MacroGoal> for UpdateMacrosDto {
    fn into(self) -> MacroGoal {
        MacroGoal {
            user_id: self.user_id,
            calories: self.calories,
            carbs: (self.calories as f32 * self.percent_carbs / 4.0) as i32,
            protein: (self.calories as f32 * self.percent_protein / 4.0) as i32,
            fat: (self.calories as f32 * self.percent_fat / 9.0) as i32,
            percent_carbs: self.percent_carbs,
            percent_protein: self.percent_protein,
            percent_fat: self.percent_fat,
        }
    }
}
