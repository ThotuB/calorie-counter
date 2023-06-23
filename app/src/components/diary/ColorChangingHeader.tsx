import { SafeAreaView } from 'react-native'
import React from 'react'
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'

const ColorChangingHeader: React.FC<{
    children: React.ReactNode
    isChanging: boolean
}> = ({ children, isChanging }) => {
    const scroll = useDerivedValue(() => {
        return isChanging ? withTiming(1) : withTiming(0)
    }, [isChanging])

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(scroll.value, [0, 1], ['rgba(0, 0, 0, 0)', 'rgba(39, 39, 42, 100)'])

        return {
            backgroundColor: backgroundColor
        }
    })

    return (
        <Animated.View style={animatedStyle}>
            <SafeAreaView className='w-full'>
                {children}
            </SafeAreaView>
        </Animated.View>
    )
}

export default ColorChangingHeader