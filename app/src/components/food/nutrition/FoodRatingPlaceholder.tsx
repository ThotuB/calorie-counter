import { View, Text } from 'react-native'
import React from 'react'
import { XIcon } from 'src/icons/outline'
import Placeholder from 'src/components/util/Placeholder'

const FoodRatingPlaceholder = () => {
    return (
        <>
            <View className='mb-3'>
                <Text className='font-bold text-zinc-300'>FOOD RATING</Text>
            </View>
            <View className='mb-5 flex-col rounded-lg bg-zinc-800 px-3 py-3'>
                <View className='flex-row items-center justify-center'>
                    <Placeholder innerClassName='h-4 w-20 my-1' />
                </View>
                <View className='mt-3 flex-row gap-x-2'>
                    <View className='flex-1 flex-col'>
                        <ProPlaceholder width='w-24' />
                        <ProPlaceholder width='w-32' />
                        <ProPlaceholder width='w-20' />
                        <ProPlaceholder width='w-28' />
                        <Placeholder innerClassName='w-36 ml-1 h-2 mt-1' />
                    </View>
                    <View className='flex-1 flex-col'>
                        <ConPlaceholder width='w-28' />
                        <Placeholder innerClassName='w-36 my-1 h-2' />
                        <ConPlaceholder width='w-32' />
                        <ConPlaceholder width='w-20' />
                        <ConPlaceholder width='w-28' />
                        <ConPlaceholder width='w-16' />
                    </View>
                </View>
            </View>
        </>
    )
}

const ProPlaceholder: React.FC<{
    width: string
}> = ({ width }) => {
    return (
        <View className='flex-row items-start'>
            <XIcon
                svgClassName='w-4 h-4 text-green-500'
                strokeWidth={4}
            />
            <Placeholder innerClassName={`${width} ml-1 h-2 mt-1`} />
        </View>
    )
}

const ConPlaceholder: React.FC<{
    width: string
}> = ({ width }) => {
    return (
        <View className='flex-row items-start'>
            <XIcon
                svgClassName='w-4 h-4 text-red-500'
                strokeWidth={4}
            />
            <Placeholder innerClassName={`${width} ml-1 h-2 mt-1`} />
        </View>
    )
}


export default FoodRatingPlaceholder