import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, Easing, withTiming } from 'react-native-reanimated'

const Placeholder: React.FC<{
    innerClassName?: string
}> = ({ innerClassName }) => {
    const opacityValue = useSharedValue(0)

    opacityValue.value = withRepeat(
        withTiming(1, { duration: 1000, easing: Easing.ease }),
        -1,
        true)

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacityValue.value
    }))

    return (
        <Animated.View
            className={`bg-zinc-200 ${innerClassName}`}
            style={animatedStyle}
        />
    )
}

export default Placeholder