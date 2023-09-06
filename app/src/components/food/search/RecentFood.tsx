import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import FoodCard from '../FoodCard'
import { MealType } from 'src/types/meal-types'
import { useQuery } from '@tanstack/react-query'
import { dateToYMD, useDate } from 'src/contexts/DateContext'
import { getRecentMeals } from 'src/services/meal'
import { useAuthedUser } from 'src/contexts/UserContext'

const RecentFoods: React.FC<{
    mealType: MealType;
}> = ({ mealType }) => {
    const { dateYMD } = useDate();
    const { user } = useAuthedUser();

    const { data: meals, isSuccess } = useQuery(["meal", user.id, dateYMD], () => getRecentMeals(user.id))

    if (!isSuccess) return null

    const yesterday = dateToYMD(new Date(new Date(dateYMD).getTime() - 86400000))

    const todayFoods = []
    const yesterdayFoods = []
    const restFoods = []
    for (const meal of meals) {
        if (meal.date === dateYMD) {
            todayFoods.push(meal.food)
        } else if (meal.date === yesterday) {
            yesterdayFoods.push(meal.food)
        } else {
            restFoods.push(meal.food)
        }
    }

    return (
        <View className='flex-col'>
            {todayFoods.length > 0 && <>
                <Text className='text-lg text-white font-bold'>Today</Text>
                {todayFoods.map((food, idx) => (
                    <View key={idx} className='my-2'>
                        <FoodCard food={food} mealType={mealType} />
                    </View>
                ))}
            </>}
            {yesterdayFoods.length > 0 && <>
                <Text className='text-lg text-white font-bold'>Yesterday</Text>
                {yesterdayFoods.map((food, idx) => (
                    <View key={idx} className='my-2'>
                        <FoodCard food={food} mealType={mealType} />
                    </View>
                ))}
            </>}
            {restFoods.length > 0 && <>
                <Text className='text-lg text-white font-bold'>Rest</Text>
                {restFoods.map((food, idx) => (
                    <View key={idx} className='my-2'>
                        <FoodCard food={food} mealType={mealType} />
                    </View>
                ))}
            </>}
        </View>
    )
}

const date_to_nr = (date: string) => {
    const [year, month, day] = date.split('-').map(str => parseInt(str, 10))
    return year * 10000 + month * 100 + day
}

export default RecentFoods