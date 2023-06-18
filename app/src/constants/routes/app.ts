import { routeTo } from "src/utils/routes";

const routes = {
    auth: '/auth',
    account_setup: '/auth/account-setup',
    home: '/logged-in/home',
    settings: '/logged-in/home/settings',
    nutrition_facts: '/logged-in/nutrition-facts',
} as const;

export const page = {
    auth: {
        accout_setup: {
            gender_selection: routeTo(routes.account_setup, '/GenderSelection'),
            height_selection: routeTo(routes.account_setup, '/HeightSelection'),
            weight_selection: routeTo(routes.account_setup, '/WeightSelection'),
            age_selection: routeTo(routes.account_setup, '/AgeSelection'),
            weight_goal: routeTo(routes.account_setup, '/WeightGoal'),
            sign_up: routeTo(routes.account_setup, '/SignUp'),
            email_auth_create: routeTo(routes.account_setup, '/EmailAuthCreate'),
        },
        authentication: routeTo(routes.auth, '/Authentication'),
        email_auth: routeTo(routes.auth, '/EmailAuth'),
    },
    home: {
        settings: {
            settings: routeTo(routes.settings, '/Settings'),
            personal_details: routeTo(routes.settings, '/PersonalDetails'),
            account_settings: routeTo(routes.settings, '/AccountSettings'),
            invite_friends: routeTo(routes.settings, '/InviteFriends'),
            diary_settings: routeTo(routes.settings, '/DiarySettings'),
            water_tracker: routeTo(routes.settings, '/WaterTracker'),
            weekly_weight_update: routeTo(routes.settings, '/WeeklyWeightUpdate'),
            fruit_tracker: routeTo(routes.settings, '/FruitTracker'),
            veges_tracker: routeTo(routes.settings, '/VegesTracker'),
            automatic_tracking: routeTo(routes.settings, '/AutomaticTracking'),
            food_preferences: routeTo(routes.settings, '/FoodPreferences'),
            adjust_macros: routeTo(routes.settings, '/AdjustMacros'),
            adjust_calories: routeTo(routes.settings, '/AdjustCalories'),
        },
        diary: routeTo(routes.home, '/Diary'),
        search_food: routeTo(routes.home, '/SearchFood'),
        progress: routeTo(routes.home, '/Progress'),
        notifications: routeTo(routes.home, '/Notifications'),
        profile: routeTo(routes.home, '/Profile'),
    },
    nutrition_facts: {
        id: routeTo(routes.nutrition_facts, '/'),
    }
} as const;
