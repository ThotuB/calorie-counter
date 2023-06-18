import axios from "axios"
import { api } from "src/constants/routes/api";
import { Meal, NewMealDto } from "src/types/meal";

export const addMeal = async (newMeal: NewMealDto) => {
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