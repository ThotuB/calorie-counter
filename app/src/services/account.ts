import axios from "axios"
import { api } from "src/constants/routes/api"
import { NewSettingsDto } from "src/types/settings"

export const createAccount = async (settings: NewSettingsDto) => {
    await axios.post(api.account, settings)
}