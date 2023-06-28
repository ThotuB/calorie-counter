const routes = {
    auth: '/auth',
    sign_up: '/auth/sign-up',
    account_setup: '/auth/sign-up/account-setup',
    home: '/logged-in/home',
    food: '/logged-in/food',
    settings: '/logged-in/settings',
    nutrition_facts: '/logged-in/nutrition-facts',
} as const;

export const page = {
    auth: {
        sign_up: {
            account_setup: {
                weight_goal: `${routes.account_setup}/WeightGoal`,
                gender_selection: `${routes.account_setup}/GenderSelection`,
                height_selection: `${routes.account_setup}/HeightSelection`,
                weight_selection: `${routes.account_setup}/WeightSelection`,
                age_selection: `${routes.account_setup}/AgeSelection`,
                sign_up: `${routes.account_setup}/SignUp`,
            },
            email_sign_up: `${routes.sign_up}/EmailSignUp`,
        },
        authentication: `${routes.auth}/Authentication`,
        email_sign_in: `${routes.auth}/EmailSignIn`,
    },
    home: {
        settings: {
            settings: `${routes.settings}/Settings`,
            personal_details: `${routes.settings}/PersonalDetails`,
            account_settings: `${routes.settings}/AccountSettings`,
            invite_friends: `${routes.settings}/InviteFriends`,
            diary_settings: `${routes.settings}/DiarySettings`,
            water_tracker: `${routes.settings}/WaterTracker`,
            weekly_weight_update: `${routes.settings}/WeeklyWeightUpdate`,
            fruit_tracker: `${routes.settings}/FruitTracker`,
            veges_tracker: `${routes.settings}/VegesTracker`,
            automatic_tracking: `${routes.settings}/AutomaticTracking`,
            food_preferences: `${routes.settings}/FoodPreferences`,
            adjust_macros: `${routes.settings}/AdjustMacros`,
            adjust_calories: `${routes.settings}/AdjustCalories`,
        },
        diary: `${routes.home}/Diary`,
        profile: `${routes.home}/Profile`,
        stats: `${routes.home}/Stats`,
        progress: `${routes.home}/Progress`,
    },
    food: {
        search_food: `${routes.food}/SearchFood`,
        scan_food: `${routes.food}/ScanFood`,
    },
    nutrition_facts: {
        id: `${routes.nutrition_facts}/`,
    }
} as const;
