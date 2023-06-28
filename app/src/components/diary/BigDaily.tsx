import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CircularProgress from '../graphs/CircularProgress';
import Loading from '../util/Loading';
import { useSteps } from 'src/contexts/StepContext';

const BigDaily: React.FC<{
    eaten?: number,
    burned?: number,
    goal?: number,
    isLoading: boolean
}> = ({ eaten = 0, burned = 0, goal = 0, isLoading }) => {
    const { caloriesBurned } = useSteps();

    return (
        <View className='flex-row items-center justify-evenly p-4'>
            <View className='flex-col w-1/4 items-center'>
                <Text className='text-3xl text-white'>
                    <CountNumberText from={0} to={eaten} />
                </Text>
                <Text className='mt-1 text-xs text-white'>EATEN</Text>
            </View>

            <View className='flex-1 relative'>
                <View className='absolute w-full h-full flex-col justify-center items-center'>
                    {eaten < goal ?
                        <>
                            <Text className='text-4xl text-white'>
                                <CountNumberText from={goal} to={goal - eaten} />
                            </Text>
                            <Text className='mt-1 text-xs text-white'>
                                CALORIES LEFT
                            </Text>
                        </> :
                        <>
                            <Text className='text-4xl text-white'>
                                <CountNumberText from={0} to={eaten - goal} />
                            </Text>
                            <Text className='mt-1 text-xs text-white'>
                                KCAL OVER
                            </Text>
                        </>
                    }
                </View>
                {isLoading ?
                    <Loading svgClassName='w-full aspect-square text-zinc-100'
                        strokeWidth={4}
                    /> :
                    <CircularProgress
                        svgClassName='w-full aspect-square text-zinc-100'
                        percentage={eaten / goal}
                        strokeWidth={4}
                    />
                }
            </View>

            <View className='flex-col w-1/4 items-center'>
                <Text className='text-3xl text-white'>{caloriesBurned.toFixed(0)}</Text>
                <Text className='mt-1 text-xs text-white'>BURNED</Text>
            </View>
        </View>
    )
}

const CountNumberText: React.FC<{
    from: number,
    to: number,
    samples?: number,
}> = ({ from, to, samples = 100 }) => {
    const values = exponentialDecay(from, to, samples);

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (index === samples - 1) {
                clearInterval(interval);
                return;
            }
            setIndex(prev => prev + 1);
        }, 20);
        return () => clearInterval(interval);
    }, [index]);

    useEffect(() => {
        setIndex(0);
    }, [to]);

    return (
        <Text>{values[index].toFixed(0)}</Text>
    )
}

function easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
}

const exponentialDecay = (from: number, to: number, samples: number) => {
    const values = [];
    if (from < to) {
        for (let i = 0; i < samples; i++) {
            values.push(from + easeOutCubic(i / samples) * (to - from));
        }
    }
    else {
        for (let i = 0; i < samples; i++) {
            values.push(from - easeOutCubic(i / samples) * (from - to));
        }
    }
    return values;
}


export default BigDaily