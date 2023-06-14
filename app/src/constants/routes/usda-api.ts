import { routeTo } from "src/utils/routes";

const usda_domain = 'https://api.nal.usda.gov/fdc/v1';

export const usda_api = {
    search: routeTo(usda_domain, '/foods/search'),
    food: routeTo(usda_domain, '/food'),
    foods: routeTo(usda_domain, '/foods'),
} as const;