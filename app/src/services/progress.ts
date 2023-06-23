import axios from "axios"
import { api } from "src/constants/routes/api"
import { ProgressDto } from "src/types/progress-types"

export const getProgress = async (userId: string, dateFrom: Date, dateTo: Date) => {
    const res = await axios.get<ProgressDto>(api.progress, {
        params: {
            user_id: userId,
            date_from: dateFrom.toISOString(),
            date_to: dateTo.toISOString()
        }
    })

    return res.data
}