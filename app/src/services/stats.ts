import axios from "axios";
import { api } from "src/constants/routes/api";
import { StatsDto } from "src/types/stats-types";

export const getStats = async (userId: string, date: string) => {
    const res = await axios.get<StatsDto>(`${api.user(userId).stats}/daily/${date}`, {
        params: {
            user_id: userId,
            day: date,
        }
    })

    return res.data;
}