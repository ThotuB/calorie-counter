import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import FoodCard from '../FoodCard'
import { MealType } from 'src/types/meal-types'
import { useQuery } from '@tanstack/react-query'
import { useDate } from 'src/contexts/DateContext'
import { getMealsForDay } from 'src/services/meal'
import { useAuthedUser } from 'src/contexts/UserContext'

const RecentFoods: React.FC<{
    mealType: MealType;
}> = ({ mealType }) => {
    const { dateYMD } = useDate();
    const { user } = useAuthedUser();

    const { data: meals, isSuccess } = useQuery(["meal", user.id, dateYMD], () => getMealsForDay(user.id, dateYMD))

    if (!isSuccess) return null

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