import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { MealType } from 'src/types/meal-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import FoodCard from '../FoodCard';
import { getFoodByUser } from 'src/services/food';
import { useQuery } from '@tanstack/react-query';

const CustomFoods: React.FC<{
    userId: string
    mealType: MealType
}> = ({ userId, mealType }) => {

    const { data: foods } = useQuery(['custom-foods', userId], () => getFoodByUser(userId))

    if (!foods) return null

    return (
        <View className='flex-col flex-1 gap-y-4'>
            {foods.map((food, idx) => (
                <View key={idx}>
                    <FoodCard food={food} mealType={mealType} />
                </View>
            ))}
        </View>
    )
}

export default CustomFoods