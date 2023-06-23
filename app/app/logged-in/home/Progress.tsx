import { ScrollView, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAuthedUser } from 'src/contexts/UserContext'
import { useQuery } from '@tanstack/react-query'
import { getProgress } from 'src/services/progress'
import { VerticalProgressBar } from 'src/components/graphs/ProgressBar'
import For from 'src/components/util/For'

const Progress = () => {
    const { user } = useAuthedUser()

    const today = new Date()
    const lastWeekDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

    const { data: progress, isLoading } = useQuery(["progress"], () => getProgress(user.id, lastWeekDate, today), {
        placeholderData: {
            average: {
                calories: 0,
                carbs: 0,
                protein: 0,
                fat: 0,
                water: 0
            },
            max: {
                calories: 0,
                carbs: 0,
                protein: 0,
                fat: 0,
                water: 0
            },
            percent_breakfast: 0,
            percent_lunch: 0,
            percent_dinner: 0,
            percent_snack: 0,
            days: []
        }
    })

    const calories = progress!.days.map(day => day.calories)
    const carbs = progress!.days.map(day => day.carbs)
    const protein = progress!.days.map(day => day.protein)
    const fat = progress!.days.map(day => day.fat)

    const { average, max } = progress!

    return (
        <ScrollView className='h-full w-full pt-12 bg-zinc-900'>
            <BarGraph
                name='Calories'
                unit='kcal'
                data={calories} bg='bg-calories' avg={average.calories} goal={max.calories} max={max.calories}
            />

            <View className='flex-col items-center'>
                <Text className='text-xl text-white font-semibold'>Average Calorie Intake</Text>
                <Text className='text-4xl mt-2 text-white font-bold'>{average.calories} kcal</Text>
            </View>

            <View className='flex-col px-10 py-6 bg-zinc-800 mt-6'>
                <Text className='text-3xl text-white font-semibold'>Calorie Intake by Meal</Text>
                <View className='flex-col items-center mt-2'>
                    <CalorieByMeal meal='Breakfast' percent={progress?.percent_breakfast} />
                    <CalorieByMeal meal='Lunch' percent={progress?.percent_lunch} />
                    <CalorieByMeal meal='Dinner' percent={progress?.percent_dinner} />
                    <CalorieByMeal meal='Snack' percent={progress?.percent_snack} />
                </View>
            </View>

            <View className='flex-col'>
                <BarGraph
                    name='Carbs'
                    unit='g'
                    data={carbs} bg='bg-carbs' avg={average.carbs} goal={max.carbs} max={max.carbs}
                />
                <BarGraph
                    name='Protein'
                    unit='g'
                    data={protein} bg='bg-protein' avg={average.protein} goal={max.protein} max={max.protein}
                />
                <BarGraph
                    name='Fat'
                    unit='g'
                    data={fat} bg='bg-fat' avg={average.fat} goal={max.fat} max={max.fat}
                />
            </View>
        </ScrollView>
    )
}

const CalorieByMeal: React.FC<{ meal: string, percent?: number }> = ({ meal, percent = 0 }) => (
    <View className='w-full flex-row items-center justify-between my-1'>
        <Text className='text-xl text-white font-bold'>{meal}</Text>
        <Text className='text-xl text-white font-bold'>{(percent * 100).toFixed(0)} %</Text>
    </View>
)

const BarGraph: React.FC<{
    name: string
    unit: string
    bg?: string
    data: number[]
    avg: number
    goal: number
    max: number
}> = ({ name, unit, bg, data, goal, avg, max }) => {
    const height = 24 * 5
    const actualMax = max > goal ? max : goal

    const avgHeight = avg / actualMax * height
    const goalHeight = goal / actualMax * height


    return (
        <View className='flex-col'>
            <Text className='text-3xl pl-10 py-6 text-white font-semibold'>{name}</Text>
            <View className='relative flex-col'>
                <View className='absolute h-full w-full z-10'>
                    <View style={{ height: avgHeight }} />
                    <View className='w-full flex-row justify-between'>
                        <For times={25} item={(<View className={'h-0.5 w-2 ' + bg} />)} />
                    </View>
                </View>
                {/* <View className='absolute h-full w-full z-10'>
                <View style={{ height: goalHeight }} />
                <View className='w-full flex-row justify-between'>
                    <For times={25} item={(<View className='h-px w-2 bg-[#adcbff]' />)} />
                </View>
            </View> */}
                <View className='w-full h-6 border-t border-zinc-700' />
                <View className='w-full h-6 border-t border-zinc-700' />
                <View className='w-full h-6 border-t border-zinc-700' />
                <View className='w-full h-6 border-t border-zinc-700' />
                <View className='w-full h-6 border-t border-zinc-700' />
                <View className='w-full h-6 border-t border-zinc-500 flex-row' >
                    <View className='flex-1 flex-row z-20'>
                        {data.map((datum, i) => (
                            <View className='mx-3 relative'>
                                <View className='absolute w-3 flex-col justify-end' style={{ top: -height, height: height }} >
                                    <VerticalProgressBar
                                        barClassName={`${bg} w-full rounded-sm`}
                                        value={datum !== 0 ? datum : actualMax * 0.04}
                                        goal={actualMax}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                    <View className='w-24' />
                </View>
            </View>
        </View>
    )
}



export default Progress