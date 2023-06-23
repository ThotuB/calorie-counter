import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { Easing, cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Loading: React.FC<{
    svgClassName: string;
    strokeWidth: number;
}> = ({ svgClassName, strokeWidth }) => {
    const innerRadius = 50 - strokeWidth / 2;
    const circumference = 2 * Math.PI * innerRadius;

    const rotation = useSharedValue(-90);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(270, {
                duration: 1000,
                easing: Easing.linear,
            }),
            -1
        );
        return () => cancelAnimation(rotation);
    }, []);


    // @ts-ignore
    const loadingStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                rotateZ: `${rotation.value}deg`,
            }]
        };
    }, [rotation.value]);

    return (
        <View className='relative'>
            <Svg
                className={'text-zinc-900/50 absolute top-0'}
                viewBox={`0 0 100 100`}
            >
                <Circle
                    cx={50}
                    cy={50}
                    r={innerRadius}
                    fill='transparent'
                    stroke='currentColor'
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeLinecap="round"
                />
            </Svg>
            <AnimatedSvg
                className={svgClassName + ' -rotate-90'}
                viewBox='0 0 100 100'
                style={loadingStyle}
            >
                <Circle
                    cx={50}
                    cy={50}
                    r={innerRadius}
                    fill='transparent'
                    stroke='currentColor'
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={circumference * 0.90}
                    strokeLinecap="round"
                />
            </AnimatedSvg>
        </View>
    );
};

export default Loading;