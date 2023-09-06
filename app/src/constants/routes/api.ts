const address = '192.168.1.222'
const port = '3000'
const domain1 = `http://${address}:${port}/api/v2` as const
const ngrok = 'https://a1b0-86-124-137-227.ngrok.io'
const domain2 = `${ngrok}/api/v2` as const

const domain = domain1

export const api = {
    user: (uid: string) => ({
        water: `${domain}/user/${uid}/water` as const,
        favorite_foods: `${domain}/user/${uid}/favorite-foods` as const,
        meals: `${domain}/user/${uid}/meals` as const,
        stats: `${domain}/user/${uid}/stats` as const,
        daily: `${domain}/user/${uid}/daily` as const,
        account: `${domain}/user/${uid}/account` as const,
        settings: `${domain}/user/${uid}/settings` as const,
    }),
    food: `${domain}/food` as const,
}