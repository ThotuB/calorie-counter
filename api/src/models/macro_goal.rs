use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::schema::macro_goals;

use super::settings::{Gender, NewSettings, System, WeightGoal};

#[derive(Queryable, AsChangeset, Serialize)]
#[diesel(table_name = macro_goals)]
pub struct MacroGoal {
    pub user_id: String,
    pub calories: i32,
    pub carbs: i32,
    pub protein: i32,
    pub fat: i32,
    pub percent_carbs: f32,
    pub percent_protein: f32,
    pub percent_fat: f32,
}

#[derive(Insertable, Deserialize)]
#[table_name = "macro_goals"]
pub struct NewMacroGoal {
    pub user_id: String,
    pub calories: i32,
    pub carbs: i32,
    pub protein: i32,
    pub fat: i32,
}

impl From<&NewSettings> for NewMacroGoal {
    fn from(settings: &NewSettings) -> NewMacroGoal {
        let weight = match settings.system {
            System::Metric => settings.weight as f32,
            System::Imperial => settings.weight as f32 * 0.453592,
        };

        let height = match settings.system {
            System::Metric => settings.height as f32,
            System::Imperial => settings.height as f32 * 2.54,
        };

        let base_calories = match settings.gender {
            Gender::Male => {
                88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * settings.age as f32)
            }
            Gender::Female => {
                447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * settings.age as f32)
            }
        };

        let calories = match settings.weight_goal {
            WeightGoal::Lose => base_calories - 500.0,
            WeightGoal::Maintain => base_calories,
            WeightGoal::Gain => base_calories + 500.0,
        };

        let carbs = (calories * 0.5 / 4.0) as i32;
        let protein = (calories * 0.3 / 4.0) as i32;
        let fat = (calories * 0.2 / 9.0) as i32;

        NewMacroGoal {
            user_id: settings.user_id.clone(),
            calories: calories as i32,
            carbs,
            protein,
            fat,
        }
    }
}
