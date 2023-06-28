const usda_domain = 'https://api.nal.usda.gov/fdc/v1';

export const usda_api = {
    search: `${usda_domain}/foods/search`,
    food: `${usda_domain}/food`,
    foods: `${usda_domain}/foods`,
} as const;