import { View, Text, Animated, Image, ImageSourcePropType, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { useDerivedValue, withTiming, useAnimatedStyle, interpolate, useSharedValue } from 'react-native-reanimated';
import { page } from 'src/constants/routes/app';
import { PlusIcon } from 'src/icons/outline';
import { MealType } from 'src/types/meal-types';
import For from '../util/For';
import Show from '../util/Show';
import { DailyMealDto } from 'src/types/daily-types';

const MealCard: React.FC<{
    iconSource: ImageSourcePropType;
    mealType: MealType;
    meal?: DailyMealDto;
    title: string;
}> = ({ iconSource, mealType, meal = { calories: 0, foods: [] }, title }) => {
    const router = useRouter();
    const [open, setOpen] = useState(true);

    const openValue = useSharedValue(0);

    // animation
    useEffect(() => {
        openValue.value = open ? withTiming(1) : withTiming(0);
    }, [open]);

    const listStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                openValue.value,
                [0, 1],
                [0, 30 * meal.foods.length + 45]),
            opacity: openValue.value,
            overflow: 'hidden',
        };
    });

    const textStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                openValue.value,
                [0, 1],
                [16, 0]
            ),
            opacity: 1 - openValue.value,
        };
    })

    // handlers
    const handleAddMeal = () => {
        router.push({
            pathname: page.home.search_food,
            params: {
                mealType,
            }
        });
    };

    const handleOpenClose = () => {
        // console.log(height.value);
        // if (height.value === 0) {
        // 	runOnUI(() => {
        // 		'worklet';
        // 		height.value = measure(listRef)?.height || 0;
        // 		console.log(height.value);
        // 	})()
        // }
        setOpen(!open);
    }

    return (
        <View className='w-full py-2'>
            <View className='flex-col w-full rounded-xl bg-zinc-800 px-6 py-4 shadow-lg'>
                <Pressable
                    className='flex-row items-center justify-between h-10'
                    onPress={handleOpenClose}
                >
                    <View className='flex-row items-center gap-x-4'>
                        <Image
                            source={iconSource}
                            className='h-10 w-10' />
                        <View className='flex-col'>
                            <Text className='text-xl font-semibold text-white'>
                                {title}
                            </Text>
                            <Show when={meal.foods.length > 0}>
                                <Animated.View style={textStyle}>
                                    <Text className='text-xs text-zinc-300'>
                                        {meal.foods.length} foods - {meal.calories} calories
                                    </Text>
                                </Animated.View>
                            </Show>
                        </View>
                    </View>
                    <Pressable className='flex-row items-center justify-center rounded-full bg-zinc-900 p-2'
                        onPress={handleAddMeal}
                    >
                        <PlusIcon
                            svgClassName='w-6 h-6 text-white'
                            strokeWidth={2}
                        />
                    </Pressable>
                </Pressable>
            </View>
            <Show when={meal.foods.length > 0}>
                <Animated.View style={listStyle}>
                    <View className='mx-4 bg-zinc-700 py-1 px-3'
                    // ref={listRef}
                    >
                        {meal.foods.map((food, idx) => (
                            <View
                                key={idx}
                                className='flex-row items-center justify-between my-1'
                            >
                                <Text className='text-white text-xs flex-1'>
                                    {food.name}</Text>
                                <Text className='text-white font-medium text-xs ml-3'>{food.calories} cal</Text>
                            </View>
                        ))}
                    </View>
                    <View className='mx-4 bg-zinc-700 rounded-b-2xl' >
                        <View className='flex-row justify-between'>
                            <For times={8} item={(
                                <View className='h-1 w-8 bg-zinc-900' />
                            )} />
                        </View>
                        <View className='flex-row justify-center py-2' >
                            <Text className='text-white text-sm font-semibold'>{meal.calories} calories</Text>
                        </View>
                    </View>
                </Animated.View>
            </Show>
        </View>
    );
};

export default MealCard