import { ScrollView, View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthedUser } from 'src/contexts/UserContext'
import { useQuery } from '@tanstack/react-query'
import { getProgress } from 'src/services/progress'
import { VerticalProgressBar } from 'src/components/graphs/ProgressBar'
import For from 'src/components/util/For'
import { dateToYMD } from 'src/contexts/DateContext'
import { ScaleIcon, StarIcon, TrophyIcon } from 'src/icons/mini'
import * as Haptics from 'expo-haptics'

const Progress = () => {
    const { user } = useAuthedUser()
    const [period, setPeriod] = useState<7 | 30 | 365>(7)

    const todayDate = new Date()
    const fromDate = new Date(todayDate.getTime() - period * 24 * 60 * 60 * 1000)

    const todayYMD = dateToYMD(todayDate)
    const fromYMD = dateToYMD(fromDate)

    const { data, isLoading, status } = useQuery(["progress", todayYMD, period], () => getProgress(user.id, fromYMD, todayYMD), {
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
            goal: {
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
        },
    })
    const progress = data!

    const calories = progress.days.map(day => day.calories)
    const carbs = progress.days.map(day => day.carbs)
    const protein = progress.days.map(day => day.protein)
    const fat = progress.days.map(day => day.fat)

    const { average, max, goal } = progress

    return (
        <ScrollView className='w-full pb-24 pt-12 bg-zinc-900'>
            <View className='w-full flex-row items-center justify-evenly py-6 sticky top-0'>
                <View className='flex-col items-center'>
                    <Text className='text-3xl text-white font-semibold'>Progress</Text>
                    <View className='flex-row mt-4'>
                        <Selectable
                            selected={period === 7}
                            onPress={() => setPeriod(7)}
                            text='Weekly'
                        />
                        <Selectable
                            selected={period === 30}
                            onPress={() => setPeriod(30)}
                            text='Monthly'
                        />
                        <Selectable
                            selected={period === 365}
                            onPress={() => setPeriod(365)}
                            text='Yearly'
                        />
                    </View>
                </View>
            </View>
            <BarGraph
                name='Calories'
                unit='kcal'
                data={calories} bg='bg-calories' avg={average.calories} goal={goal.calories} max={max.calories}
            />
            <BarGraph
                name='Carbs'
                unit='g'
                data={carbs} bg='bg-carbs' avg={average.carbs} goal={goal.carbs} max={max.carbs}
            />
            <BarGraph
                name='Protein'
                unit='g'
                data={protein} bg='bg-protein' avg={average.protein} goal={goal.protein} max={max.protein}
            />
            <BarGraph
                name='Fat'
                unit='g'
                data={fat} bg='bg-fat' avg={average.fat} goal={goal.fat} max={max.fat}
            />
            <View className='flex-col px-10 py-6 bg-zinc-800 mt-6 mb-16'>
                <Text className='text-3xl text-white font-semibold'>Calorie Intake by Meal</Text>
                <View className='flex-col items-center mt-2'>
                    <CalorieByMeal meal='Breakfast' percent={progress.percent_breakfast} />
                    <CalorieByMeal meal='Lunch' percent={progress.percent_lunch} />
                    <CalorieByMeal meal='Dinner' percent={progress.percent_dinner} />
                    <CalorieByMeal meal='Snack' percent={progress.percent_snack} />
                </View>
            </View>

            <View className='flex-col'>
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
    bg: string
    data: number[]
    avg: number
    goal: number
    max: number
}> = ({ name, unit, bg, data, goal, avg, max }) => {
    const height = 32 * 5
    const scale = goal > 0 ? (max > goal ? max : goal) : 1

    const scaledAvg = avg / scale
    const scaledMax = max / scale
    const scaledGoal = goal / scale

    const avgHeight = (1 - scaledAvg) * height
    const maxHeight = (1 - scaledMax) * height
    const goalHeight = (1 - scaledGoal) * height

    return (
        <View className='flex-col mb-6'>
            <Text className='text-2xl pl-10 py-6 text-white font-semibold'>{name}</Text>
            <View className='relative flex-col'>
                {scale !== 1 &&
                    <>
                        <View className='absolute h-full w-full z-10' style={{ top: -16 }}>
                            <View style={{ height: avgHeight }} />
                            <View className='flex-row w-full'>
                                <View className='flex-1 flex-row h-full items-center justify-between border-r border-white'>
                                    <For times={25} item={(<View className={'h-0.5 w-2 bg-white'} />)} />
                                </View>
                                <View className='flex-row items-center justify-between w-16 h-8 px-1.5 bg-zinc-800'>
                                    <ScaleIcon svgClassName={'text-white w-4 h-4'} />
                                    <Text className='text-white text-xs font-bold'>{avg}</Text>
                                </View>
                            </View>
                        </View>
                        <View className='absolute h-full w-full z-10' style={{ top: -16 }}>
                            <View style={{ height: maxHeight }} />
                            <View className='flex-row w-full'>
                                <View className='flex-1 flex-row h-full items-center justify-between border-r border-white'>
                                    <For times={25} item={(<View className={'h-0.5 w-2 bg-white'} />)} />
                                </View>
                                <View className='flex-row items-center justify-between w-16 h-8 px-1.5 bg-zinc-800'>
                                    <StarIcon svgClassName={'text-white w-4 h-4'} />
                                    <Text className='text-white text-xs font-bold'>{max}</Text>
                                </View>
                            </View>
                        </View>
                        <View className='absolute h-full w-full z-10' style={{ top: -16 }}>
                            <View style={{ height: goalHeight }} />
                            <View className='flex-row w-full'>
                                <View className='flex-1 flex-row h-full items-center justify-between border-r border-white'>
                                    <For times={25} item={(<View className={'h-0.5 w-2 bg-white'} />)} />
                                </View>
                                <View className='flex-row items-center justify-between w-16 h-8 px-1.5 bg-zinc-800'>
                                    <TrophyIcon svgClassName={'text-white w-4 h-4'} />
                                    <Text className='text-white text-xs font-bold'>{goal}</Text>
                                </View>
                            </View>
                        </View>
                    </>
                }
                <View className='w-full h-8 border-t border-zinc-700' />
                <View className='w-full h-8 border-t border-zinc-700' />
                <View className='w-full h-8 border-t border-zinc-700' />
                <View className='w-full h-8 border-t border-zinc-700' />
                <View className='w-full h-8 border-t border-zinc-700' />
                <View className='w-full h-4 border-t border-zinc-500 flex-row' >
                    <View className='flex-1 flex-row z-20'>
                        {data.map((datum, i) => (
                            <View className='mx-3 relative' key={i}>
                                <View className='absolute w-3 flex-col justify-end z-50 h-40 -top-40'>
                                    <VerticalProgressBar
                                        barClassName={`${bg} w-full rounded-sm`}
                                        value={datum !== 0 ? datum / scale : scaledMax * 0.04}
                                        goal={1}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                    <View className='w-12' />
                </View>
            </View>
            <View className='flex-row justify-evenly'>
                <View className='flex-col w-24 h-24 items-center justify-center rounded-3xl bg-zinc-700'>
                    <Text className='text-white font-extrabold'>Average</Text>
                    <ScaleIcon svgClassName={'my-2 text-white w-4 h-4'} />
                    <Text className='text-xs text-white font-bold'>{avg} {unit}</Text>
                </View>
                <View className='flex-col w-24 h-24 items-center justify-center rounded-3xl bg-zinc-700'>
                    <Text className='text-white font-extrabold'>Max</Text>
                    <StarIcon svgClassName={'my-2 text-white w-4 h-4'} />
                    <Text className='text-xs mt-1 text-white font-bold'>{max} {unit}</Text>
                </View>
                <View className='flex-col w-24 h-24 items-center justify-center rounded-3xl bg-zinc-700'>
                    <Text className='text-white font-extrabold'>Goal</Text>
                    <TrophyIcon svgClassName={'my-2 text-white w-4 h-4'} />
                    <Text className='text-xs mt-1 text-white font-bold'>{goal} {unit}</Text>
                </View>
            </View>
        </View>
    )
}

const Selectable: React.FC<{
    selected: boolean;
    text: string;
    onPress: () => void;
}> = ({ text, selected, onPress }) => {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress();
    };

    return (
        <Pressable
            className={`mx-2 w-24 flex-row justify-center rounded-lg py-2 ${selected ? 'bg-emerald-300' : 'bg-zinc-800'}`}
            onPress={handlePress}
        >
            <Text className={`text-white font-bold ${selected ? 'text-white' : 'text-white'}`}>{text}</Text>
        </Pressable>
    );
};

export default Progress