import axios from "axios"
import { api } from "src/constants/routes/api";
import { FavoriteFoodIdsDto } from "src/types/favorite-food";
import { getFoodByIds } from "./usda-food";

export const getFavoriteFoods = async (userId: number) => {
    const res = await axios.get<FavoriteFoodIdsDto>(api.favorite_foods, {
        params: {
            user_id: userId,
        },
    });

    return getFoodByIds(res.data);
}

export const addFavoriteFood = async (userId: number, foodId: number) => {
    const res = await axios.post(api.favorite_foods, {
        user_id: userId,
        food_id: foodId,
    });

    return res.data;
}