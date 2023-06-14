import { routeTo } from "src/utils/routes";

const address = '172.22.118.161'
const port = '5000'
const domain1 = `https://${address}:${port}/api`
const domain2 = 'https://7234-86-125-92-108.eu.ngrok.io' + '/api'

const domain = domain2

export const api = {
    favorite_foods: routeTo(domain, '/favorite-foods'),
    meals: routeTo(domain, '/meals'),
    test: routeTo(domain, '/test'),
} as const;