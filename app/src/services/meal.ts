import axios from "axios"
import { api } from "src/constants/routes/api";
import { Meal, CreateMeal } from "src/types/meal-types";

export const addMeal = async (newMeal: CreateMeal) => {
    await axios.post(api.user(newMeal.user_id).meals, newMeal);
}

export const getMealsForDay = async (userId: string, date: Date) => {
    const res = await axios.get<Meal[]>(api.user(userId).meals, {
        params: {
            user_id: userId,
            day: date.toISOString(),
        },
    });

    return res.data;
}