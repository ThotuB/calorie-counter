import axios from "axios";
import { Food } from "src/types/food";
import { FoodDto, SearchResultDto, SearchResultFoodDto } from "src/types/usda-food";
import { usdaFoodToFood, usdaSearchFoodToFood } from "src/utils/usda-food";

export const getFood = async (searchTerm: string, pageNumber: number): Promise<Food[]> => {
    const res = await axios
        .get<SearchResultDto>('https://api.nal.usda.gov/fdc/v1/foods/search', {
            params: {
                api_key: 'g8hkV8fS6A17dTaS0DEk464LisJCu8AdN2gKIU2C',
                generalSearchInput: searchTerm,
                dataType: 'Branded',
                pageNumber: pageNumber,
                pageSize: 10,
            },
        });

    const data = res.data;

    return data.foods.map((food) => usdaSearchFoodToFood(food));
}

export const getFoodById = async (id: string): Promise<Food> => {
    const res = await axios
        .get<FoodDto>(`https://api.nal.usda.gov/fdc/v1/food/${id}`, {
            params: {
                api_key: 'g8hkV8fS6A17dTaS0DEk464LisJCu8AdN2gKIU2C',
            },
        });

    const data = res.data;

    return usdaFoodToFood(data);
}