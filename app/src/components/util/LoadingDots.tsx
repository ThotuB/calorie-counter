import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { Easing, cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

const LoadingDots: React.FC<{
    dotsClassName?: string
    width: string
    height: string
}> = ({ width, height, dotsClassName }) => {
    const loading = useSharedValue(0)

    useEffect(() => {
        loading.value = withRepeat(
            withTiming(1, {
                duration: 1000,
                easing: Easing.ease,
            }),
            -1
        );
        return () => cancelAnimation(loading);
    }, []);

    const dot1Style = useAnimatedStyle(() => ({
        height: `${Math.sin(loading.value * 2 * Math.PI) * 100}%`,
    }))
    const dot2Style = useAnimatedStyle(() => ({
        height: `${Math.sin((loading.value - 0.2) * 2 * Math.PI) * 100}%`,
    }))
    const dot3Style = useAnimatedStyle(() => ({
        height: `${Math.sin((loading.value - 0.4) * 2 * Math.PI) * 100}%`,
    }))

    return (
        <View className='flex-row items-center'>
            <View className={`${width} ${height} flex-row items-center justify-center`}>
                <Animated.View className={'rounded-full aspect-square ' + dotsClassName}
                    style={dot1Style}
                />
            </View>
            <View className={`${width} ${height} mx-4 flex-row items-center justify-center`}>
                <Animated.View className={'rounded-full aspect-square ' + dotsClassName}
                    style={dot2Style}
                />
            </View>
            <View className={`${width} ${height} flex-row items-center justify-center`}>
                <Animated.View className={'rounded-full aspect-square ' + dotsClassName}
                    style={dot3Style}
                />
            </View>
        </View>
    )
}

export default LoadingDots