import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFavoriteFoods } from 'src/services/favorite-food'
import FoodCard from '../FoodCard'

const FavoriteFoods: React.FC<{
    userId: number
}> = ({ userId }) => {
    const { data: foods } = useQuery(['favorite-foods', userId], () => getFavoriteFoods(userId))

    return (
        <View className='flex-col gap-y-4'>
            {foods?.map((food, idx) => (
                <View key={idx}>
                    <FoodCard food={food} />
                </View>
            ))}
        </View>
    )
}

export default FavoriteFoods