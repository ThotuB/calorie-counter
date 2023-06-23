import axios from "axios"
import { api } from "src/constants/routes/api";
import { Meal, CreateMeal } from "src/types/meal-types";

export const addMeal = async (newMeal: CreateMeal) => {
    const res = await axios.post(api.meals, newMeal);

    return res.data;
}

export const getMealsForDay = async (userId: string, date: string) => {
    const res = await axios.get<Meal[]>(api.meals, {
        params: {
            user_id: userId,
            day: date,
        },
    });

    return res.data;
}