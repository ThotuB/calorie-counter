export interface MacroGoalDto {
    user_id: string;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
    percent_carbs: number;
    percent_protein: number;
    percent_fat: number;
}

export interface UpdateMacroGoalDto {
    user_id: string;
    calories: number;
    percent_carbs: number;
    percent_protein: number;
    percent_fat: number;
}