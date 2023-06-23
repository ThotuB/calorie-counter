import { View, Text, Image, Modal, Pressable, SafeAreaView, ImageSourcePropType } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur';
import { PlusIcon } from 'src/icons/outline';
import { useRouter } from 'expo-router';
import Animated, { interpolate, useDerivedValue, useAnimatedStyle, withDelay, withTiming } from 'react-native-reanimated';
import { page } from 'src/constants/routes/app';
import { MealType } from 'src/types/meal-types';

const AddModal: React.FC<{
    open: boolean;
    close: () => void;
}> = ({ open, close }) => {
    const router = useRouter();

    const openValue = useDerivedValue(() => {
        return open ? withDelay(100, withTiming(1)) : withTiming(0);
    }, [open]);

    // @ts-ignore
    const plusStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                rotate: `${interpolate(openValue.value, [0, 1], [0, 45])}deg`
            }]
        }
    })

    const handlePushSearch = (mealType: MealType) => {
        close()
        router.push({
            pathname: page.home.search_food,
            params: {
                mealType,
            }
        });
    };

    const closeModal = () => {
        setTimeout(() => {
            close()
        }, 100);
    };

    return (
        <Modal visible={open} transparent animationType='fade'>
            <Pressable
                className='h-full w-full'
                onPress={close}
            >
                <BlurView
                    className='h-full w-full flex-col items-center justify-end'
                    tint='dark'
                    intensity={90}
                >
                    <View className='w-full flex-col px-14'>
                        <View className='w-full flex-row justify-between px-4'>
                            <ModalItem
                                image={require('/assets/food/water-0.5.png')}
                                name='Weight'
                            />
                            <ModalItem
                                image={require('/assets/food/water-0.5.png')}
                                name='0.5 l'
                            />
                            <ModalItem
                                image={require('/assets/food/water-0.5.png')}
                                name='0.5 l'
                            />
                        </View>
                        <View className='mt-4 w-full flex-row justify-between'>
                            <ModalItem
                                image={require('/assets/food/breakfast.png')}
                                name='Breakfast'
                                onPress={() => handlePushSearch('breakfast')}
                                big
                            />
                            <ModalItem
                                image={require('/assets/food/lunch.png')}
                                name='Lunch'
                                onPress={() => handlePushSearch('lunch')}
                                big
                            />
                        </View>
                        <View className='mt-4 w-full flex-row justify-between'>
                            <ModalItem
                                image={require('/assets/food/dinner.png')}
                                name='Dinner'
                                onPress={() => handlePushSearch('dinner')}
                                big
                            />
                            <ModalItem
                                image={require('/assets/food/popcorn.png')}
                                name='Snack'
                                onPress={() => handlePushSearch('snack')}
                                big
                            />
                        </View>
                    </View>
                    <SafeAreaView>
                        <Pressable
                            className='my-10'
                            onPress={closeModal}
                            hitSlop={30}
                        >
                            <View className='rounded-full bg-emerald-300 p-2 '>
                                <Animated.View style={plusStyle}>
                                    <PlusIcon
                                        svgClassName='w-10 h-10 text-white'
                                        strokeWidth={3}
                                    />
                                </Animated.View>
                            </View>
                        </Pressable>
                    </SafeAreaView>
                </BlurView>
            </Pressable>
        </Modal>
    )
}

const ModalItem: React.FC<{
    image: ImageSourcePropType;
    name: string;
    big?: boolean;
    onPress?: () => void;
}> = ({ image, name, big, onPress }) => (
    <Pressable className='flex-col items-center' onPress={onPress}>
        <View
            className={`${big ? 'h-24 w-24 p-3' : 'h-16 w-16 p-1'
                } rounded-full bg-zinc-800`}
        >
            <Image source={image} className='h-full w-full' />
        </View>
        <Text className='text-lg font-semibold text-zinc-200'>{name}</Text>
    </Pressable>
);

export default AddModal