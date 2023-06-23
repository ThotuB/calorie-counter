import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import TitleLayout from 'src/layouts/TitleLayout'
import DoughnutChart from 'src/components/graphs/DoughnutChart'
import { SmallMinusIcon, SmallPlusIcon } from 'src/icons/outline'
import Slider from '@react-native-community/slider'
import ColorfulButton from 'src/components/util/ColorfulButton'
import { getSettings, updateMacroGoal } from 'src/services/settings'
import { useAuthedUser } from 'src/contexts/UserContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { UpdateMacroGoalDto } from 'src/types/macro-goal'
import { page } from 'src/constants/routes/app'

const AdjustMacros = () => {
    const router = useRouter()
    const { user } = useAuthedUser()
    const { data: macros } = useQuery(['macros'], () => getSettings(user.id), {
        onSuccess: (data) => {
            setCarbs(data.percent_carbs * 100)
            setProtein(data.percent_protein * 100)
            setFat(data.percent_fat * 100)
        }
    })

    const { mutate: updateMacros } = useMutation((updatedMacros: UpdateMacroGoalDto) => updateMacroGoal(updatedMacros), {
        onSuccess: () => {
            router.push(page.home.profile)
        }
    })

    const [carbs, setCarbs] = useState(50)
    const [protein, setProtein] = useState(20)
    const [fat, setFat] = useState(30)

    if (!macros) return null

    const totalCalories = macros.calories
    const totalPercentage = carbs + protein + fat
    const is100 = totalPercentage === 100
    const isSavable = is100 && (carbs !== macros.percent_carbs * 100 || protein !== macros.percent_protein * 100 || fat !== macros.percent_fat * 100)

    const handleSave = () => {
        updateMacros({
            user_id: user.id,
            calories: totalCalories,
            percent_carbs: carbs / 100,
            percent_protein: protein / 100,
            percent_fat: fat / 100
        })
    }

    return (

        <TitleLayout title='Adjust Macros' back safe >
            <View className="h-full flex-col">
                <View className="flex-1 flex-col items-center">
                    <View className='relative my-12'>
                        <View className='absolute top-0 left-0 w-40 h-40 flex-row justify-center items-center z-10'>
                            <Text className={`text-3xl font-bold ${is100 ? 'text-zinc-50' : 'text-rose-500'}`}>
                                {totalPercentage}%
                            </Text>
                        </View>
                        <DoughnutChart
                            svgClassName='w-40 h-40'
                            data={[
                                { value: carbs, color: 'text-carbs' },
                                { value: protein, color: 'text-protein' },
                                { value: fat, color: 'text-fat' }
                            ]}
                            strokeWidth={18}
                        />
                    </View>
                    <AdjustMacro
                        color='#f78f2f'
                        altColor='carbs'
                        name='Carbs'
                        value={carbs}
                        totalCalories={totalCalories}
                        calPerGram={4}
                        setValue={setCarbs} />
                    <AdjustMacro
                        color='#3ca9e4'
                        altColor='protein'
                        name='Protein'
                        value={protein}
                        totalCalories={totalCalories}
                        calPerGram={4}
                        setValue={setProtein} />
                    <AdjustMacro
                        color='#8078c7'
                        altColor='fat'
                        name='Fat'
                        value={fat}
                        totalCalories={totalCalories}
                        calPerGram={9}
                        setValue={setFat} />
                </View>
                <View className="flex-col px-4 mb-4 bg-zinc-8">
                    <ColorfulButton
                        text='SAVE SETTINGS'
                        buttonClassName='flex-row justify-center rounded-xl py-3'
                        textClassName='text-base font-bold'
                        color='rgb(74, 222, 128)'
                        colorDisabled='rgb(39, 39, 42)'
                        textColor='rgb(24, 24, 27)'
                        textColorDisabled='rgb(250, 250, 250)'
                        disabled={!isSavable}
                        onPress={handleSave}
                    />
                </View>
            </View>
        </TitleLayout>
    )
}

const AdjustMacro: React.FC<{
    color: string,
    altColor?: string,
    name: string,
    value: number,
    totalCalories: number,
    calPerGram: number,
    setValue: (value: number) => void
}> = ({ color, altColor, name, value, totalCalories, calPerGram, setValue }) => {
    return (
        <View className='w-full flex-col my-4 px-4'>
            <View className='w-full flex-row justify-between items-center'>
                <View className='flex-row items-center'>
                    <View className={`w-3 h-3 rounded-sm bg-${altColor} ml-4`} />
                    <Text className={`ml-4 text-lg font-bold text-${altColor}`}>
                        {name}
                    </Text>
                </View>
                <View className='flex-row items-center pr-12'>
                    <Text className='text-base font-medium text-zinc-100'>
                        {Math.round(totalCalories * value / 100 / calPerGram)} g
                    </Text>
                    <Text className='w-12 text-right text-base font-medium text-zinc-100'>
                        {value}%
                    </Text>
                    <Text className='w-20 text-right text-base font-medium text-zinc-100'>
                        {Math.round(totalCalories * value / 100)} kcal
                    </Text>
                </View>
            </View>
            <View className='w-full flex-row items-center mt-3'>
                <Pressable
                    onPress={() => value > 0 && setValue(value - 1)}
                    hitSlop={20}
                >
                    <SmallMinusIcon svgClassName='w-6 h-6 text-white' />
                </Pressable>
                <Slider
                    style={{
                        flex: 1,
                        marginHorizontal: 16
                    }}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    minimumTrackTintColor={color}
                    maximumTrackTintColor="rgb(63, 63, 70)"
                    thumbTintColor="#FFFFFF"
                    value={value}
                    onValueChange={setValue}
                />
                <Pressable
                    onPress={() => value < 100 && setValue(value + 1)}
                    hitSlop={20}
                >
                    <SmallPlusIcon svgClassName='w-6 h-6 text-white' />
                </Pressable>
            </View>
        </View>
    )
}

export default AdjustMacros