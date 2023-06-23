import axios from "axios"
import { api } from "src/constants/routes/api"
import { NewSettingsDto } from "src/types/settings"

export const createAccount = async (settings: NewSettingsDto) => {
    const res = await axios.post(api.account, settings)

    return res.data
}