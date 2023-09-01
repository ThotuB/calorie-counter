import axios from "axios"
import { api } from "src/constants/routes/api"

export const getWater = async (userId: string, date: string) => {
    const res = await axios.get<number>(`${api.user(userId).water}/${date}`, {
        params: {
            user_id: userId,
            date: date
        }
    })

    return res.data
}

export const putWater = async (userId: string, date: string, amount: number) => {
    const res = await axios.put<number>(api.user(userId).water, {
        user_id: userId,
        date: date,
        amount: amount
    })

    return res.data
}