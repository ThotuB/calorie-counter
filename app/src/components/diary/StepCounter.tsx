import { View, Text, Pressable } from 'react-native'
import React from 'react'
import AppleHealthKit from 'react-native-health'
import { useSteps } from 'src/contexts/StepContext'

const StepCounter = () => {
    const { steps, isActivated } = useSteps()

    return (
        <View className='w-full flex-col items-center'>
            {isActivated ?
                <>
                    <Text className='text-zinc-200 text-xl font-medium'>
                        Step Counter
                    </Text>
                    <Text className='mt-3 text-zinc-300 text-4xl font-bold text-center'>
                        {steps} Steps
                    </Text>
                </> :
                <>
                    <Text className='text-zinc-200 text-xl font-medium'>
                        Activate Step Counter
                    </Text>
                    <Text className='mt-3 text-zinc-300 text-center'>
                        Synchronize with Apple Health to automatically track your movement.
                    </Text>
                    <View className='h-0.5 w-full bg-zinc-700 my-3' />
                    <Pressable className='w-full'>
                        <Text className='text-emerald-600 text-base font-semibold text-center'>
                            ACTIVATE
                        </Text>
                    </Pressable>
                </>
            }
        </View>
    )
}

export default StepCounter