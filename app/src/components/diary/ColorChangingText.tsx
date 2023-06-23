import React from 'react'
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'

const ColorChangingText: React.FC<{
    text: string
    isChanging: boolean
}> = ({ text, isChanging }) => {
    const scroll = useDerivedValue(() => {
        return isChanging ? withTiming(1) : withTiming(0)
    }, [isChanging])

    const animatedStyle = useAnimatedStyle(() => ({
        color: interpolateColor(scroll.value, [0, 1], ['#FFFFFF', 'rgb(52, 211, 153)'])
    }))

    return (
        <Animated.Text style={animatedStyle} className='text-2xl font-bold'>
            {text}
        </Animated.Text>
    )
}

export default ColorChangingText