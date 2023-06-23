import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const ColorfulButton: React.FC<{
    text: string,
    buttonClassName: string,
    textClassName: string,
    disabled: boolean,
    color: string,
    colorDisabled: string,
    textColor: string,
    textColorDisabled: string,
    onPress: () => void
}> = ({ text, buttonClassName, textClassName, disabled, color, colorDisabled, textColor, textColorDisabled, onPress }) => {
    const enabledValue = useSharedValue(0)

    useEffect(() => {
        enabledValue.value = disabled ? withTiming(0) : withTiming(1)
    }, [disabled])

    const buttonStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(enabledValue.value, [0, 1], [colorDisabled, color]),
    }))

    const textStyle = useAnimatedStyle(() => ({
        color: interpolateColor(enabledValue.value, [0, 1], [textColorDisabled, textColor]),
    }))

    return (
        <AnimatedPressable className={buttonClassName}
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled}
        >
            <Animated.Text className={textClassName}
                style={textStyle}
            >
                {text}
            </Animated.Text>
        </AnimatedPressable>
    )
}

export default ColorfulButton