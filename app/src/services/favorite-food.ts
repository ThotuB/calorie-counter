import axios from "axios"
import { api } from "src/constants/routes/api";
import { Food } from "src/types/food";

export const getFavoriteFoods = async (userId: string) => {
    const res = await axios.get<Food[]>(api.favorite_foods, {
        params: {
            user_id: userId,
        },
    });

    return res.data;
}

export const addFavoriteFood = async (userId: string, foodId: number) => {
    const res = await axios.post(api.favorite_foods, {
        user_id: userId,
        food_id: foodId,
    });

    return res.data;
}

export const removeFavoriteFood = async (userId: string, foodId: number) => {
    const res = await axios.delete(api.favorite_foods, {
        params: {
            user_id: userId,
            food_id: foodId,
        },
    });

    return res.data;
}

export const isFavoriteFood = async (userId: string, foodId: number) => {
    const res = await axios.get<boolean>(api.is_favorite_food, {
        params: {
            user_id: userId,
            food_id: foodId,
        },
    });

    return res.data;
}