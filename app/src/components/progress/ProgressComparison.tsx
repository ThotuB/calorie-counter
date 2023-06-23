import { View, Text } from 'react-native'
import React from 'react'
import { VerticalProgressBar } from '../graphs/ProgressBar'
import { StatsMacroPercentagesDto } from 'src/types/stats-types'

const ProgressComparison: React.FC<{
    intake_percentages: StatsMacroPercentagesDto
    goal_percentages: StatsMacroPercentagesDto
}> = ({ intake_percentages, goal_percentages }) => {
    const largestPercentage = Math.max(
        intake_percentages.carbs,
        intake_percentages.protein,
        intake_percentages.fat,
        goal_percentages.carbs,
        goal_percentages.protein,
        goal_percentages.fat
    )

    return (
        <View className='flex-row w-full px-3'>
            <View className='pr-1 flex-col items-end justify-between'>
                <Text className='-mt-2 text-xs text-zinc-400 font-semibold'>{largestPercentage.toFixed(0)}%</Text>
                <Text className='mb-6 text-xs text-zinc-400 font-semibold'>0%</Text>
            </View>
            <View className='flex-col flex-1'>
                <View className='w-full h-8 border-t border-zinc-700' />
                <View className='w-full h-8 border-t border-zinc-700' />
                <View className='w-full h-8 border-t border-zinc-700' />
                <View className='w-full h-8 border-t border-zinc-700' />
                <View className='w-full h-8 border-t border-zinc-700' />
                <View className='w-full h-8 border-t border-zinc-500 flex-row justify-evenly' >
                    <MacroBars
                        macro='CARBS'
                        value={intake_percentages.carbs}
                        goal={goal_percentages.carbs}
                        max={largestPercentage}
                        color='bg-carbs'
                    />
                    <MacroBars
                        macro='PROTEIN'
                        value={intake_percentages.protein}
                        goal={goal_percentages.protein}
                        max={largestPercentage}
                        color='bg-protein'
                    />
                    <MacroBars
                        macro='FAT'
                        value={intake_percentages.fat}
                        goal={goal_percentages.fat}
                        max={largestPercentage}
                        color='bg-fat'
                    />
                </View>
            </View>
        </View>
    )
}


const MacroBars: React.FC<{
    macro: string;
    value: number;
    goal: number;
    max: number;
    color?: string;
}> = ({ macro, value, goal, max, color }) => {
    const height = 32 * 5

    return (
        <View className='relative flex-col items-center'>
            <View className='relative flex-row'>
                <View className='absolute right-1 flex-col justify-end w-3'
                    style={{ top: -height, height: height }}
                >
                    <VerticalProgressBar
                        barClassName={'w-full rounded-sm bg-zinc-400'}
                        value={goal}
                        goal={max}
                    />
                </View>
                <View className='absolute left-1 w-3 flex-col justify-end' style={{ top: -height, height: height }}>
                    <VerticalProgressBar
                        barClassName={'w-full rounded-sm ' + color}
                        value={value}
                        goal={max}
                    />
                </View>
            </View>
            <Text className='py-1 font-medium text-zinc-400'>{macro}</Text>
        </View>
    )
}

export default ProgressComparison