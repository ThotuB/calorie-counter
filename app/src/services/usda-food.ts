import axios from "axios";
import { usda_api } from "src/constants/routes/usda-api";
import { Food } from "src/types/food";
import { FoodDto, SearchResultDto } from "src/types/usda-food";
import { usdaFoodToFood, usdaSearchFoodToFood } from "src/utils/usda-food";

const apiKey = 'g8hkV8fS6A17dTaS0DEk464LisJCu8AdN2gKIU2C';

export const getFood = async (searchTerm: string, pageNumber: number) => {
    const res = await axios
        .get<SearchResultDto>(usda_api.search, {
            params: {
                api_key: apiKey,
                generalSearchInput: searchTerm,
                dataType: 'Branded',
                pageNumber: pageNumber,
                pageSize: 10,
            },
        });

    const data = res.data;

    return data.foods.map((food) => usdaSearchFoodToFood(food));
}

export const getFoodById = async (id: string) => {
    const res = await axios
        .get<FoodDto>(usda_api.food + '/' + id, {
            params: {
                api_key: apiKey,
            },
        });

    const data = res.data;

    return usdaFoodToFood(data);
}

export const getFoodByIds = async (ids: number[]) => {
    const res = await axios
        .get<FoodDto[]>(usda_api.foods, {
            params: {
                api_key: apiKey,
                fdcIds: ids.join(','),
            },
        });

    const data = res.data;

    return data.map((food) => usdaFoodToFood(food));
}