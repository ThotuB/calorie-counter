const address = '172.22.118.161'
const port = '6000'
const domain1 = `https://${address}:${port}/api/v2` as const
const ngrok = 'https://0082-84-232-150-105.eu.ngrok.io'
const domain2 = `${ngrok}/api/v2` as const

const domain = domain2
type Domain = typeof domain

export const api = {
    user: (uid: string) => ({
        water: `${domain}/user/${uid}/water` as const,
        favorite_foods: `${domain}/user/${uid}/favorite_foods` as const,
        meals: `${domain}/user/${uid}/meals` as const,
        stats: `${domain}/user/${uid}/stats` as const,
        daily: `${domain}/user/${uid}/daily` as const,
        account: `${domain}/user/${uid}/account` as const,
        settings: `${domain}/user/${uid}/settings` as const,
    }),
    food: `${domain}/food` as const,
}