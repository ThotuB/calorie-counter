import axios from "axios"
import { api } from "src/constants/routes/api"
import { ProgressDto } from "src/types/progress-types"

export const getProgress = async (userId: string, dateFrom: string, dateTo: string) => {
    const res = await axios.get<ProgressDto>(`${api.user(userId).stats}/progress/${dateFrom}/${dateTo}`)

    return res.data
}