import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFavoriteFoods } from 'src/services/favorite-food'
import FoodCard from '../FoodCard'
import { MealType } from 'src/types/meal-types'

const FavoriteFoods: React.FC<{
    userId: string;
    mealType: MealType;
}> = ({ userId, mealType }) => {
    const { data: foods } = useQuery(['favorite-foods', userId], () => getFavoriteFoods(userId))

    if (!foods) return null

    return (
        <View className='flex-col gap-y-4'>
            {foods.map((food, idx) => (
                <View key={idx}>
                    <FoodCard food={food} mealType={mealType} />
                </View>
            ))}
        </View>
    )
}

export default FavoriteFoods