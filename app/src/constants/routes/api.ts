import { routeTo } from "src/utils/routes";

const address = '172.22.118.161'
const port = '6000'
const domain1 = `https://${address}:${port}/api` as const
const ngrok = 'https://83a3-84-232-150-105.eu.ngrok.io'
const domain2 = `${ngrok}/api` as const

const domain = domain2

export const api = {
    favorite_foods: routeTo(domain, '/favorite-foods'),
    is_favorite_food: routeTo(domain, '/favorite-food'),
    meals: routeTo(domain, '/meals'),
    test: routeTo(domain, '/test'),
    account: routeTo(domain, '/account'),
    water: routeTo(domain, '/water'),
    daily: routeTo(domain, '/daily'),
    stats: routeTo(domain, '/stats'),
    progress: routeTo(domain, '/progress'),
    settings: routeTo(domain, '/settings'),
    adjust_macros: routeTo(domain, '/settings/adjust-macros'),
} as const;