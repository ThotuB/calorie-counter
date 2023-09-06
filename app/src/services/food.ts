import axios from "axios";
import { api } from "src/constants/routes/api";
import { Food, CreateFoodDto } from "src/types/food";

export const getFoodByUser = async (userId: string) => {
    const res = await axios.get<Food[]>(`${api.food}/user/${userId}`);

    return res.data;
}

export const getFoodByBarcode = async (barcode: string) => {
    const res = await axios.get<Food>(`${api.food}/barcode/${barcode}`);

    return res.data;
}

export const addFood = async (newFood: CreateFoodDto) => {
    const res = await axios.post(api.food, newFood);

    console.log(res.status);

    return res.data;
}