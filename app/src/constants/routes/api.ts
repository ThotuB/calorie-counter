import { routeTo } from "src/utils/routes";

const address = '172.22.118.161'
const port = '6000'
const domain1 = `https://${address}:${port}/api`
const ngrok = 'https://0082-84-232-150-105.eu.ngrok.io'
const domain2 = `${ngrok}/api` as const

const domain = domain2

export const api = {
    favorite_foods: `${domain}/favorite-foods`,
    is_favorite_food: `${domain}/favorite-food`,
    meals: `${domain}/meals`,
    test: `${domain}/test`,
    account: `${domain}/account`,
    water: `${domain}/water`,
    daily: `${domain}/daily`,
    stats: `${domain}/stats`,
    progress: `${domain}/progress`,
    settings: `${domain}/settings`,
    adjust_macros: `${domain}/settings/adjust-macros`,
} as const;