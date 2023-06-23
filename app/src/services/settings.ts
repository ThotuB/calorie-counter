import axios from "axios"
import { api } from "src/constants/routes/api"
import { MacroGoalDto, UpdateMacroGoalDto } from "src/types/macro-goal"

export const getSettings = async (userId: string) => {
    const res = await axios.get<MacroGoalDto>(`${api.settings}/${userId}`)

    return res.data
}

export const updateMacroGoal = async (macroGoal: UpdateMacroGoalDto) => {
    const res = await axios.put(api.adjust_macros, macroGoal)

    return res.data
}