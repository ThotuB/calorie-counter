import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import TitleLayout from 'src/layouts/TitleLayout'
import { ToggleSectionItem } from 'src/components/settings/Section'
import { styled } from 'nativewind'
import Slider from '@react-native-community/slider'

const StyledSlider = styled(Slider)

const FruitTracker = () => {
    const [on, setOn] = useState(false)
    const [goal, setGoal] = useState(3)

    return (
        <TitleLayout title="Fruit Tracker" safe back>
            <View className='h-full flex-col justify-between'>
                <ScrollView className='flex-1'>
                    <View className='flex-1 flex-col divide-y divide-zinc-800'>
                        <View className='px-4'>
                            <ToggleSectionItem
                                leftText='Fruit Tracker'
                                value={on}
                                onToggle={() => setOn(!on)}
                            />
                        </View>
                        <View className='flex-col w-full items-center px-6 py-4'>
                            <Text className='text-2xl font-semibold text-zinc-100'>
                                Daily Goal
                            </Text>
                            <View className='mt-5 flex-row items-center gap-x-2'>
                                <Text className='text-2xl font-bold text-zinc-50'>
                                    {goal}
                                </Text>
                                <Text className='text-lg text-zinc-50'>
                                    servings
                                </Text>
                            </View>
                            <StyledSlider className='mt-4 w-full'
                                minimumValue={1}
                                maximumValue={6}
                                step={1}
                                value={goal}
                                onValueChange={setGoal}
                                minimumTrackTintColor="rgb(52, 211, 153)"
                                maximumTrackTintColor="#rgb(39, 39, 42)"
                            />
                        </View>
                    </View>
                </ScrollView>
                <View className='flex-col px-4 pt-4'>
                    <Pressable className='flex-row justify-center rounded-lg bg-zinc-800 py-4'>
                        <Text className='text-base font-semibold text-zinc-50'>
                            SAVE SETTINGS
                        </Text>
                    </Pressable>
                </View>
            </View>

        </TitleLayout>
    )
}

export default FruitTracker
