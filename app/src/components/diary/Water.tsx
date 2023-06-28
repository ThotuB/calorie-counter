import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { DotsHorizontalIcon, PlusIcon } from 'src/icons/outline'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getWater, putWater } from 'src/services/water'
import { useAuthedUser } from 'src/contexts/UserContext'
import { useDate } from 'src/contexts/DateContext'

const Water = () => {
    const goal = 4
    const [water, setWater] = useState(0)
    const { user } = useAuthedUser()
    const { dateYMD } = useDate()

    const { isLoading } = useQuery(['water'], () => getWater(user.id, dateYMD), {
        onSuccess: (data) => {
            setWater(data)
        },
        onError: () => {
            setWater(0)
        }
    })

    const { mutate: mutateWater } = useMutation((amount: number) => putWater(user.id, dateYMD, amount))

    const setWaterAmount = (amount: number) => {
        setWater(amount)
        mutateWater(amount)
    }

    return (
        <View className='flex-col'>
            <View className='flex-row items-center justify-between w-full'>
                <Text className='text-white text-lg font-semibold'>
                    {water * 0.5} L
                </Text>
                <Text className='text-white font-semibold text-xl'>
                    Water
                </Text>
                <Pressable>
                    <DotsHorizontalIcon
                        svgClassName='w-6 h-6 text-white'
                        strokeWidth={2}
                    />
                </Pressable>
            </View>
            <View className='my-4 flex-row items-center justify-between w-full'>
                {[...Array(water)].map((_, i) => (
                    <Pressable
                        key={i}
                        onPress={() => setWaterAmount(water - 1)}
                        className='flex-1 flex-row justify-center'
                    >
                        <Image source={require('/assets/food/water-0.5.png')}
                            className='w-10 h-20'
                        />
                    </Pressable>
                ))}
                {[...Array(goal - water)].map((_, i) => (
                    <Pressable
                        key={i}
                        onPress={() => setWaterAmount(water + i + 1)}
                        className='flex-1 flex-row justify-center items-center'
                    >
                        {i == 0 &&
                            <PlusIcon svgClassName='absolute w-5 h-5 text-white z-10' strokeWidth={3} />
                        }
                        <Image source={require('/assets/food/water-gray-0.5.png')}
                            className='w-10 h-20'

                        />
                    </Pressable>
                ))}
                {[...Array(8 - goal)].map((_, i) => (
                    <View key={i} className='flex-1' />
                ))}
            </View>
            {water == goal &&
                <View className='flex-row pt-4 border-t border-zinc-700'>
                    <View className='flex-col'>
                        <Text className='text-white text-2xl font-semibold'>
                            Job well done
                        </Text>
                        <Text className='text-white'>
                            Great job! You've reached your daily goal, but remember to drink more water if you're thirsty or if you exercise.
                        </Text>
                    </View>
                </View>
            }
        </View>
    )
}

export default Water