import axios from "axios"
import { api } from "src/constants/routes/api"
import { MacroGoalDto, UpdateMacroGoalDto } from "src/types/macro-goal"

export const getSettings = async (userId: string) => {
    const res = await axios.get<MacroGoalDto>(api.user(userId).settings)

    return res.data
}

export const updateMacroGoal = async (macroGoal: UpdateMacroGoalDto) => {
    await axios.put(api.user(macroGoal.user_id).settings, macroGoal)
}