import { useQuery, useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, View, Text, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import ColorfulButton from 'src/components/util/ColorfulButton'
import { page } from 'src/constants/routes/app'
import { useAuthedUser } from 'src/contexts/UserContext'
import TitleLayout from 'src/layouts/TitleLayout'
import { getSettings, updateMacroGoal } from 'src/services/settings'
import { UpdateMacroGoalDto } from 'src/types/macro-goal'

const AdjustCalories = () => {
    const router = useRouter()
    const { user } = useAuthedUser()
    const { data: macros, isLoading, isSuccess } = useQuery(['macros'], () => getSettings(user.id), {
        onSuccess: (data) => {
            setCalories(data.calories)
        }
    })

    const { mutate: updateMacros } = useMutation((updatedMacros: UpdateMacroGoalDto) => updateMacroGoal(updatedMacros), {
        onSuccess: () => {
            router.push(page.home.profile)
        }
    })

    const [calories, setCalories] = useState(2568)

    const handleSave = () => {
        if (!macros) return

        updateMacros({
            user_id: user.id,
            calories: calories,
            percent_carbs: macros.percent_carbs,
            percent_protein: macros.percent_protein,
            percent_fat: macros.percent_fat
        })
    }

    const isSaveable = macros && calories !== macros.calories && calories > 1000

    return (

        <KeyboardAvoidingView
            className='h-full'
            behavior="padding"
        >
            <TitleLayout title='Adjust Macros' back safe >
                <View className="h-full flex-col">
                    <View className="flex-1 flex-col items-center">
                        <View className='flex-row items-center'>
                            {isSuccess ?
                                <TextInput
                                    className='w-24 h-12 my-12 px-2 text-3xl font-bold text-right text-zinc-50 border-b-4 border-green-400'
                                    value={calories > 0 ? calories.toString() : ''}
                                    onChangeText={(text) => setCalories(parseInt(text) || 0)}
                                    keyboardType='numeric'
                                    maxLength={4}
                                    selectTextOnFocus
                                    returnKeyType='done'
                                /> :
                                <View className='w-24 h-12 my-12 px-2 border-b-4 border-orange-400'>
                                    <Text className='text-3xl font-bold text-center text-zinc-50'>
                                        .  .  .
                                    </Text>
                                </View>
                            }
                            <Text className='ml-4 text-3xl font-bold text-zinc-50'>
                                cal
                            </Text>
                        </View>
                        <View className="w-full flex-col items-center">
                            <Macro
                                altColor='carbs'
                                name='Carbs'
                                value={macros?.percent_carbs}
                                totalCalories={calories}
                                calPerGram={4} />
                            <Macro
                                altColor='protein'
                                name='Protein'
                                value={macros?.percent_protein}
                                totalCalories={calories}
                                calPerGram={4} />
                            <Macro
                                altColor='fat'
                                name='Fat'
                                value={macros?.percent_fat}
                                totalCalories={calories}
                                calPerGram={9} />
                        </View>
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
                            disabled={!isSaveable}
                            onPress={handleSave}
                        />
                    </View>
                </View>
            </TitleLayout>
        </KeyboardAvoidingView>
    )
}


const Macro: React.FC<{
    altColor?: string,
    name: string,
    value?: number,
    totalCalories: number,
    calPerGram: number,
}> = ({ altColor, name, value, totalCalories, calPerGram }) => {
    return (
        <View className='w-full flex-row py-3 my-1 px-6 justify-between items-center bg-zinc-800'>
            <View className='flex-row items-center'>
                <View className={`w-3 h-3 rounded-sm bg-${altColor}`} />
                <Text className={`ml-4 text-lg font-bold text-${altColor}`}>
                    {name}
                </Text>
            </View>
            <View className='flex-row items-center'>
                {
                    value &&
                    <>
                        <Text className='text-base font-semibold text-zinc-100'>
                            {Math.round(totalCalories * value / calPerGram)} g
                        </Text>
                        <Text className='w-16 text-right text-base font-semibold text-zinc-100'>
                            {value * 100}%
                        </Text>
                        <Text className='w-24 text-right text-base font-semibold text-zinc-100'>
                            {Math.round(totalCalories * value)} kcal
                        </Text>
                    </>
                }
            </View>
        </View>
    )
}

export default AdjustCalories