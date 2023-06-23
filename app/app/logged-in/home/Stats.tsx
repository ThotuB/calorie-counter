import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { ChevronUpIcon, TrophyIcon } from 'src/icons/outline'
import For from 'src/components/util/For'
import { useAuthedUser } from 'src/contexts/UserContext'
import { getStats } from 'src/services/stats'
import { useQuery } from '@tanstack/react-query'
import DoughnutChart from 'src/components/graphs/DoughnutChart'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { ScrollView } from 'react-native-gesture-handler'
import { HorizontalProgressBar, VerticalProgressBar } from 'src/components/graphs/ProgressBar'
import { useDate } from 'src/contexts/DateContext'
import ProgressDetails from 'src/components/progress/ProgressDetails'
import ProgressComparison from 'src/components/progress/ProgressComparison'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'src/icons/solid'

const dayInitials = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const Stats: React.FC = () => {
    const { user } = useAuthedUser()
    const { date, dateYMD, setYesterday, setTomorrow, day } = useDate()

    const { data: stats, isLoading, isSuccess } = useQuery(['stats', user.id, dateYMD], () => getStats(user.id, dateYMD), {
        placeholderData: {
            date: dateYMD,
            calories: 0,
            calories_goal: 0,
            carbs_goal: 0,
            protein_goal: 0,
            fat_goal: 0,
            goal_percentages: {
                carbs: 0,
                protein: 0,
                fat: 0,
            },
            intake_percentages: {
                carbs: 0,
                protein: 0,
                fat: 0
            },
            calories_last_week: [0, 0, 0, 0, 0, 0, 0],
            nutrients: {
                carbs: 0,
                protein: 0,
                fat: 0
            },
            vitamins: {},
            minerals: {},
            amino_acids: {}
        }
    })

    const { goal_percentages, intake_percentages } = stats!

    return (
        <ScrollView className='w-full flex-1 pt-12 bg-zinc-900'>
            <View className='w-full flex-row items-center justify-evenly py-6 sticky top-0'>
                <Pressable onPress={setYesterday}>
                    <ArrowLeftCircleIcon svgClassName='w-10 h-10 text-white' />
                </Pressable>
                <View className='flex-col items-center'>
                    <Text className='text-3xl text-white font-semibold'>Daily Stats</Text>
                    <Text className='text-xl text-zinc-400 font-semibold'>
                        {day.toUpperCase()}
                    </Text>
                </View>
                <Pressable onPress={setTomorrow}>
                    <ArrowRightCircleIcon svgClassName='w-10 h-10 text-white' />
                </Pressable>
            </View>
            <View className='flex-col'>
                <View className='flex-row w-full bg-[#23262d]'>
                    <View className='flex-1 flex-row h-full items-center justify-between border-r border-[#adcbff]'>
                        <For times={25} item={(<View className='h-px w-2 bg-[#adcbff]' />)} />
                    </View>
                    <View className='flex-row items-center justify-center w-24 h-8'>
                        <Text className='text-lg text-[#adcbff] font-semibold'>KCAL</Text>
                        <TrophyIcon svgClassName='ml-3 text-[#adcbff] w-3 h-3' />
                    </View>
                </View>
                <View className='w-full h-4' />
                <View className='w-full h-8 border-t border-zinc-700' />
                <View className='w-full h-8 border-t border-zinc-700' />
                <View className='w-full h-8 border-t border-zinc-700' />
                <View className='w-full h-8 border-t border-zinc-700' />
                <View className='w-full h-8 border-t border-zinc-500 flex-row' >
                    <View className='flex-1 flex-row justify-evenly'>
                        {[...Array(7)].map((_, i) => (
                            <StatsDay
                                key={i}
                                day={dayInitials[(date.getDay() + i) % 7]}
                                kcal={stats!.calories_last_week[i]}
                                goal={stats!.calories_goal} />
                        ))}
                        <StatsDay
                            day={dayInitials[date.getDay()]}
                            kcal={stats!.calories}
                            goal={stats!.calories_goal}
                            selected
                        />
                    </View>
                    <View className='w-24' />
                </View>
            </View>
            <View className='flex-col pt-6 px-10'>
                <Text className='text-3xl text-white font-semibold'>Daily Intake</Text>
                <View className='py-6'>
                    <MacroBar
                        name='KCAL'
                        unit='KCAL'
                        value={stats?.calories}
                        goal={stats?.calories_goal}
                        barColor='bg-calories'
                    />
                </View>
                <View className='py-2'>
                    <MacroBar
                        name='CARBS'
                        unit='G'
                        value={stats?.nutrients.carbs}
                        goal={stats?.carbs_goal}
                        barColor='bg-carbs'
                    />
                </View>
                <View className='py-2'>
                    <MacroBar
                        name='PROTEIN'
                        unit='G'
                        value={stats?.nutrients.protein}
                        goal={stats?.protein_goal}
                        barColor='bg-protein'
                    />
                </View>
                <View className='py-2'>
                    <MacroBar
                        name='FAT'
                        unit='G'
                        value={stats?.nutrients.fat}
                        goal={stats?.fat_goal}
                        barColor='bg-fat'
                    />
                </View>

                <Intake
                    name='Goal Intake'
                    carbsPercent={goal_percentages.carbs}
                    proteinPercent={goal_percentages.protein}
                    fatPercent={goal_percentages.fat}
                />

                <Intake
                    name='Your Intake'
                    carbsPercent={intake_percentages.carbs}
                    proteinPercent={intake_percentages.protein}
                    fatPercent={intake_percentages.fat}
                />

                <View className='flex-row justify-between my-8'>
                    <Text className='text-3xl text-white font-semibold'>Comparison</Text>
                    <View className='flex-col'>
                        <View className='flex-row items-center'>
                            <View className='w-3 h-3 bg-zinc-400 rounded-full mr-3' />
                            <Text className='text-base text-zinc-400 font-semibold'>GOAL INTAKE</Text>
                        </View>
                        <View className='flex-row mt-2 items-center'>
                            <View className='w-3 h-3 bg-calories rounded-full mr-3' />
                            <Text className='text-base text-zinc-400 font-semibold'>YOUR INTAKE</Text>
                        </View>
                    </View>
                </View>
            </View>

            <ProgressComparison intake_percentages={intake_percentages} goal_percentages={goal_percentages} />

            {isSuccess && <ProgressDetails stats={stats} />}

        </ScrollView>
    )
}

const StatsDay: React.FC<{
    day: string;
    kcal?: number;
    goal?: number;
    selected?: boolean;
}> = ({ day, kcal = 0, goal = 0, selected }) => {
    const height = 32 * 5

    return (
        <View className='relative flex-col items-center'>
            {selected ?
                <>
                    <View className='absolute w-2 flex-col justify-end' style={{ top: -height, height: height }} >
                        <VerticalProgressBar
                            barClassName='bg-emerald-500 w-full rounded-sm'
                            value={kcal}
                            goal={goal}
                        />
                    </View>
                    <Text className='py-1 font-medium text-emerald-500'>{day}</Text>
                    <ChevronUpIcon svgClassName='w-3 h-3 text-emerald-500' strokeWidth={7} />
                </> :
                <>
                    <View className='absolute w-2 flex-col justify-end' style={{ top: -height, height: height }}>
                        <VerticalProgressBar
                            barClassName='bg-zinc-400 w-full rounded-sm'
                            value={kcal}
                            goal={goal}
                        />
                    </View>
                    <Text className='py-1 font-medium text-zinc-400'>{day}</Text>
                </>
            }
        </View>
    )
}

const MacroBar: React.FC<{
    name: string;
    unit: string;
    value?: number;
    goal?: number;
    barColor: string;
}> = ({ name, unit, value = 0, goal = 0, barColor }) => {
    return (
        <View className='flex-col'>
            <View className='flex-row justify-between'>
                <Text className='text-zinc-400 font-semibold'>{name}</Text>
                <Text className='text-zinc-400 font-semibold'>{value.toFixed(0)} / {goal} {unit}</Text>
            </View>
            <View className='w-full h-2 my-1 bg-zinc-700 rounded-full overflow-hidden'>
                <HorizontalProgressBar
                    barClassName={'absolute h-full rounded-full ' + (value > goal ? 'bg-red-500' : `${barColor}`)}
                    value={value}
                    goal={goal}
                />
            </View>
        </View>
    )
}

const Intake: React.FC<{
    name: string;
    carbsPercent: number;
    proteinPercent: number;
    fatPercent: number;
}> = ({ name, carbsPercent, proteinPercent, fatPercent }) => (
    <>
        <Text className='text-3xl py-6 text-white font-semibold'>{name}</Text>
        <View className='flex-row justify-between items-center'>
            <View className='flex-col'>
                <View className='flex-row items-center'>
                    <View className='w-3 h-3 bg-carbs rounded-full mr-3' />
                    <Text className='text-base text-zinc-400 font-semibold'>{(carbsPercent * 100).toFixed(0)}% CARBS</Text>
                </View>
                <View className='flex-row my-1 items-center'>
                    <View className='w-3 h-3 bg-protein rounded-full mr-3' />
                    <Text className='text-base text-zinc-400 font-semibold'>{(proteinPercent * 100).toFixed(0)}% PROTEIN</Text>
                </View>
                <View className='flex-row items-center'>
                    <View className='w-3 h-3 bg-fat rounded-full mr-3' />
                    <Text className='text-base text-zinc-400 font-semibold'>{(fatPercent * 100).toFixed(0)}% FAT</Text>
                </View>
            </View>
            <View>
                <DoughnutChart
                    svgClassName='w-24 h-24'
                    data={[
                        { value: carbsPercent, color: 'text-carbs' },
                        { value: proteinPercent, color: 'text-protein' },
                        { value: fatPercent, color: 'text-fat' },
                    ]}
                    strokeWidth={20}
                />
            </View>
        </View>
    </>
)

export default Stats