const routes = {
    auth: '/auth',
    account_setup: '/auth/account-setup',
    home: '/home',
    nutrition_facts: '/nutrition-facts',
} as const;

const routeTo = <From extends string, To extends string>(from: From, to: To) => {
    return `${from}${to}` as `${From}${To}`;
}

export const page = {
    auth: {
        accout_setup: {
            gender_selection: routeTo(routes.account_setup, '/GenderSelection'),
            height_selection: routeTo(routes.account_setup, '/HeightSelection'),
            weight_selection: routeTo(routes.account_setup, '/WeightSelection'),
            weight_goal: routeTo(routes.account_setup, '/WeightGoal'),
            sign_up: routeTo(routes.account_setup, '/SignUp'),
            email_auth_create: routeTo(routes.account_setup, '/EmailAuthCreate'),
        },
        authentication: routeTo(routes.auth, '/Authentication'),
        email_auth: routeTo(routes.auth, '/EmailAuth'),
    },
    home: {
        diary: routeTo(routes.home, '/Diary'),
        food_search: routeTo(routes.home, '/FoodSearch'),
        progress: routeTo(routes.home, '/Progress'),
    },
    nutrition_facts: {
        id: routeTo(routes.nutrition_facts, '/'),
    }
} as const;