import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress: React.FC<{
    svgClassName: string;
    strokeWidth: number;
    percentage: number;
}> = ({ svgClassName, strokeWidth, percentage }) => {
    const innerRadius = 50 - strokeWidth / 2;
    const circumfrence = 2 * Math.PI * innerRadius;

    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(percentage, {
            duration: 1000
        })
        return () => cancelAnimation(progress);
    }, [percentage]);

    // @ts-ignore
    const progressCircleStyle = useAnimatedStyle(() => {
        return {
            strokeDashoffset: interpolate(
                progress.value,
                [0, 1],
                [circumfrence, 0]
            ),
            stroke: interpolateColor(
                progress.value,
                [0, 1],
                ['#EEEEEE', 'rgb(251, 146, 60)']
            )
        };
    });

    return (
        <View className='relative'>
            <Svg
                className={'text-zinc-100/50 absolute top-0'}
                viewBox={`0 0 100 100`}
            >
                <Circle
                    cx={50}
                    cy={50}
                    r={innerRadius}
                    fill='transparent'
                    stroke='currentColor'
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumfrence} ${circumfrence}`}
                    strokeLinecap="round"
                />
            </Svg>
            <Svg
                className={svgClassName + ' -rotate-90'}
                viewBox='0 0 100 100'
            >
                <AnimatedCircle
                    style={progressCircleStyle}
                    cx={50}
                    cy={50}
                    r={innerRadius}
                    fill='transparent'
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumfrence} ${circumfrence}`}
                    strokeLinecap="round"
                />
            </Svg>
        </View>
    );
};

export default CircularProgress;
