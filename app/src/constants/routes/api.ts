import { routeTo } from "src/utils/routes";

const address = '172.22.118.161'
const port = '6000'
const domain1 = `https://${address}:${port}/api`
const domain2 = 'https://fab5-84-232-150-105.eu.ngrok.io' + '/api'

const domain = domain2

export const api = {
    favorite_foods: routeTo(domain, '/favorite-foods'),
    is_favorite_food: routeTo(domain, '/favorite-food'),
    meals: routeTo(domain, '/meals'),
    test: routeTo(domain, '/test'),
    settings: routeTo(domain, '/settings'),
} as const;