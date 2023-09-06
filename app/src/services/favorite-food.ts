import axios from "axios"
import { api } from "src/constants/routes/api";
import { AddRemoveFavoriteFoodDto } from "src/types/favorite-food";
import { Food } from "src/types/food";
import { Source } from "src/types/source_enum";

export const getFavoriteFoods = async (userId: string) => {
    const res = await axios.get<Food[]>(api.user(userId).favorite_foods);

    return res.data;
}

export const addFavoriteFood = async (favMeal: AddRemoveFavoriteFoodDto) => {
    const res = await axios.post(api.user(favMeal.user_id).favorite_foods, favMeal);

    return res.data;
}

export const removeFavoriteFood = async (userId: string, foodId: number, source: Source) => {
    const res = await axios.delete<Record<string, never>>(`${api.user(userId).favorite_foods}/${source}/${foodId}`);

    return res.data;
}

export const isFavoriteFood = async (userId: string, foodId: number, source: Source) => {
    const res = await axios.get<boolean>(`${api.user(userId).favorite_foods}/${source}/${foodId}`);

    return res.data;
}