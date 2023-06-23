import { View, Text } from 'react-native'
import React from 'react'
import Placeholder from 'src/components/util/Placeholder'

const NutritionalFactsPlaceholder = () => {
    return (
        <>
            <View className='mb-3'>
                <Text className='font-bold text-zinc-300'>
                    NUTRITIONAL FACTS
                </Text>
            </View>
            <View className='flex-col rounded-lg bg-zinc-800 px-3 py-3'>
                <View className='mb-3 flex-col'>
                    <View className='flex-row'>
                        <Placeholder innerClassName='h-4 w-20 my-1' />
                        <Placeholder innerClassName='h-4 w-40 ml-2 my-1' />
                    </View>
                    <Placeholder innerClassName='h-3 w-28 my-1' />
                    <View className='mt-3 flex-row justify-between'>
                        <View className='flex-col items-center'>
                            <View className='h-24 w-24 rounded-full border-8 border-zinc-100'>
                            </View>
                            <Placeholder innerClassName='h-4 w-14 mt-3' />
                        </View>
                        <View className='flex-col items-center'>
                            <View className='h-24 w-24 rounded-full border-8 border-zinc-100'>
                            </View>
                            <Placeholder innerClassName='h-4 w-16 mt-3' />
                        </View>
                        <View className='flex-col items-center'>
                            <View className='h-24 w-24 rounded-full border-8 border-zinc-100'>
                            </View>
                            <Placeholder innerClassName='h-4 w-10 mt-3' />
                        </View>
                    </View>
                </View>
                <View>
                    <NutrientTablePlaceholder />
                </View>
            </View>
        </>
    )
}

const NutrientTablePlaceholder = () => (
    <View className='flex-col'>
        <Divider />
        <NutrientRowPlaceholder leftWidth='w-24' rightWidth='w-14' />
        <Divider />
        <NutrientRowPlaceholder leftWidth='w-14' rightWidth='w-20' />
        <NutrientRowPlaceholder leftWidth='w-12' rightWidth='w-8' />
        <NutrientRowPlaceholder leftWidth='w-16' rightWidth='w-12' />
        <Divider />
        <NutrientRowPlaceholder leftWidth='w-24' rightWidth='w-14' />
        <Divider />
        <NutrientRowPlaceholder leftWidth='w-10' rightWidth='w-16' />
        <NutrientRowPlaceholder leftWidth='w-28' rightWidth='w-14' />
        <NutrientRowPlaceholder leftWidth='w-32' rightWidth='w-4' />
        <Divider />
    </View>
)

const NutrientRowPlaceholder: React.FC<{
    rightWidth: string
    leftWidth: string
}> = ({ rightWidth, leftWidth }) => (
    <View className='my-2 flex-row justify-between'>
        <Placeholder innerClassName={`h-2 ${leftWidth}`} />
        <Placeholder innerClassName={`h-2 ${rightWidth}`} />
    </View>
)

const Divider = () => <View className='h-0.5 my-1 w-full rounded-full bg-zinc-600' />


export default NutritionalFactsPlaceholder