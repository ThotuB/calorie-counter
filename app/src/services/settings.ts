import axios from "axios"
import { api } from "src/constants/routes/api"
import { NewSettingsDto, Settings } from "src/types/settings"

export const createSettings = async (settings: NewSettingsDto) => {
    const res = await axios.post<Settings>(api.settings, settings)

    return res.data
}

export const getSettings = async (userId: number) => {
    const res = await axios.get<Settings>(api.settings, {
        params: {
            user_id: userId,
        },
    })

    return res.data
}