import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import FoodCard from '../FoodCard'
import { MealType } from 'src/types/meal'
import { useMeals } from 'src/contexts/MealContext'

const RecentFoods: React.FC<{
    userId: string;
    mealType: MealType;
}> = ({ userId, mealType }) => {
    const { meals } = useMeals()

    const foods = meals.map(meal => meal.food)

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

export default RecentFoods