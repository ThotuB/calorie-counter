import { View, Text, Pressable } from 'react-native'
import React from 'react'
import AppleHealthKit from 'react-native-health'

const StepCounter = () => {
    const permissions = {
        permissions: {
            read: [AppleHealthKit.Constants.Permissions.StepCount],
            write: []
        }
    }

    // AppleHealthKit.isAvailable((err: Object, available: boolean) => {
    //     if (err) {
    //         console.log('error initializing Healthkit: ', err)
    //         return
    //     }
    // })

    // appleHealthKit.initHealthKit(permissions, (err) => {
    //     if (err) {
    //         console.log('error initializing Healthkit: ', err)
    //         return
    //     }
    // })

    return (
        <View className='w-full flex-col items-center'>
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
        </View>
    )
}

export default StepCounter