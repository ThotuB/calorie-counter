import { Aminos, Minerals, Nutrients, Vitamins } from "./food";

export interface StatsDto {
    date: string,
    calories: number,
    calories_goal: number,
    carbs_goal: number,
    fat_goal: number,
    protein_goal: number,
    goal_percentages: StatsMacroPercentagesDto,
    intake_percentages: StatsMacroPercentagesDto,
    calories_last_week: number[],
    nutrients: Nutrients,
    vitamins: Vitamins,
    minerals: Minerals,
    amino_acids: Aminos,
}

export interface StatsMacroPercentagesDto {
    carbs: number,
    protein: number,
    fat: number,
}