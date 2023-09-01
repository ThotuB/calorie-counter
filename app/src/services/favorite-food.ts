import axios from "axios"
import { api } from "src/constants/routes/api";
import { AddRemoveFavoriteFoodDto } from "src/types/favorite-food";
import { Food } from "src/types/food";

export const getFavoriteFoods = async (userId: string) => {
    const res = await axios.get<Food[]>(api.user(userId).favorite_foods, {
        params: {
            user_id: userId,
        },
    });

    return res.data;
}

export const addFavoriteFood = async (favMeal: AddRemoveFavoriteFoodDto) => {
    const res = await axios.post(api.user(favMeal.user_id).favorite_foods, favMeal);

    return res.data;
}

export const removeFavoriteFood = async (favMeal: AddRemoveFavoriteFoodDto) => {
    const res = await axios.delete<Record<string, never>>(api.user(favMeal.user_id).favorite_foods, {
        params: { ...favMeal },
    });

    return res.data;
}

export const isFavoriteFood = async (favMeal: AddRemoveFavoriteFoodDto) => {
    const res = await axios.get<boolean>(`${api.user(favMeal.user_id).favorite_foods}/${favMeal.food_id}`, {
        params: {
            ...favMeal
        },
    });

    return res.data;
}