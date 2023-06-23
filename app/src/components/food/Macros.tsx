import { View, Text } from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { HorizontalProgressBar } from '../graphs/ProgressBar';

const Macros: React.FC<{
	carbs?: number;
	carbsGoal?: number;
	protein?: number;
	proteinGoal?: number;
	fat?: number;
	fatGoal?: number;
}> = ({ carbs = 0, carbsGoal = 0, protein = 0, proteinGoal = 0, fat = 0, fatGoal = 0 }) => {

	return (
		<View className='w-full flex-row justify-between'>
			<Macro
				barClassName='bg-orange-300'
				name='Carbs'
				value={carbs}
				goal={carbsGoal}
			/>
			<Macro
				barClassName='bg-pink-300'
				name='Protein'
				value={protein}
				goal={proteinGoal}
			/>
			<Macro
				barClassName='bg-purple-300'
				name='Fat'
				value={fat}
				goal={fatGoal}
			/>
		</View>
	)
}

const Macro: React.FC<{
	barClassName: string;
	name: string;
	value: number;
	goal: number;
}> = ({ barClassName, name, value, goal }) => {
	return (
		<View className='flex-col items-center gap-y-1'>
			<Text className='text-xs text-white'>{name}</Text>
			<View className='h-1.5 w-20 flex-row overflow-hidden rounded-3xl bg-zinc-900'>
				<HorizontalProgressBar
					barClassName={'h-full ' + barClassName}
					value={value}
					goal={goal}
				/>
			</View>
			<Text className='text-xs text-white'>
				{value.toFixed(0)} / {goal}g
			</Text>
		</View>
	);
}
export default Macros;
