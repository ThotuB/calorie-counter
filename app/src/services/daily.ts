import axios from "axios";
import { api } from "src/constants/routes/api";
import { DailyDto } from "src/types/daily-types";

export const getDaily = async (userId: string, date: string) => {
    const res = await axios.get<DailyDto>(`${api.user(userId).daily}/${date}`)

    return res.data;
}