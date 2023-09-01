use serde::{Deserialize, Serialize};

use super::settings::{Gender, Settings, System, WeightGoal};

#[derive(FromRow, Deserialize, Serialize)]
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

impl MacroGoal {
    pub fn new(user_id: String, calories: i32, carbs: i32, protein: i32, fat: i32) -> MacroGoal {
        let percent_carbs = carbs as f32 / calories as f32;
        let percent_protein = protein as f32 / calories as f32;
        let percent_fat = fat as f32 / calories as f32;

        MacroGoal {
            user_id,
            calories,
            carbs,
            protein,
            fat,
            percent_carbs,
            percent_protein,
            percent_fat,
        }
    }
}

impl From<&Settings> for MacroGoal {
    fn from(settings: &Settings) -> MacroGoal {
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

        MacroGoal::new(
            settings.user_id.clone(),
            calories as i32,
            carbs,
            protein,
            fat,
        )
    }
}
