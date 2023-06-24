import axios from "axios"
import { api } from "src/constants/routes/api";
import { AddRemoveFavoriteFoodDto } from "src/types/favorite-food";
import { Food } from "src/types/food";

export const getFavoriteFoods = async (userId: string) => {
    const res = await axios.get<Food[]>(api.favorite_foods, {
        params: {
            user_id: userId,
        },
    });

    return res.data;
}

export const addFavoriteFood = async (favMeal: AddRemoveFavoriteFoodDto) => {
    const res = await axios.post(api.favorite_foods, favMeal);

    return res.data;
}

export const removeFavoriteFood = async (favMeal: AddRemoveFavoriteFoodDto) => {
    const res = await axios.delete(api.favorite_foods, {
        params: {
            ...favMeal
        },
    });

    return res.data;
}

export const isFavoriteFood = async (favMeal: AddRemoveFavoriteFoodDto) => {
    const res = await axios.get<boolean>(api.is_favorite_food, {
        params: {
            ...favMeal
        },
    });

    return res.data;
}