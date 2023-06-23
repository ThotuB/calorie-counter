import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

export const HorizontalProgressBar: React.FC<{
    barClassName: string;
    value: number;
    goal: number;
}> = ({ barClassName, value, goal }) => {
    const progress = goal === 0 ? 0 : Math.min(value / goal, 1) * 100;

    const progressValue = useSharedValue(0);

    useEffect(() => {
        progressValue.value = withTiming(progress, {
            duration: 800
        });
    }, [progress]);

    const progressStyle = useAnimatedStyle(() => {
        return {
            width: `${progressValue.value}%`
        };
    });

    return (
        <Animated.View
            style={progressStyle}
            className={barClassName}
        />
    )
}

export const VerticalProgressBar: React.FC<{
    barClassName: string;
    value: number;
    goal: number;
}> = ({ barClassName, value, goal }) => {
    const progress = goal === 0 ? 0 : Math.min(value / goal, 1) * 100;

    const progressValue = useSharedValue(0);

    useEffect(() => {
        progressValue.value = withTiming(progress, {
            duration: 800
        });
    }, [progress]);

    const progressStyle = useAnimatedStyle(() => {
        return {
            height: `${progressValue.value}%`
        };
    });

    return (
        <Animated.View
            style={progressStyle}
            className={barClassName}
        />
    )
}