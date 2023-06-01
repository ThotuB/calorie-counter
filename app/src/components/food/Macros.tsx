import { View, Text } from 'react-native';
import React from 'react';

const Macros: React.FC<{
	carbs: {
		value: number;
		goal: number;
	};
	protein: {
		value: number;
		goal: number;
	};
	fat: {
		value: number;
		goal: number;
	};
}> = ({ carbs, protein, fat }) => (
	<View className='flex-row justify-between'>
		<Macro
			barClassName='bg-orange-300'
			name='Carbs'
			value={carbs.value}
			goal={carbs.goal}
		/>
		<Macro
			barClassName='bg-pink-300'
			name='Protein'
			value={protein.value}
			goal={protein.goal}
		/>
		<Macro
			barClassName='bg-purple-300'
			name='Fat'
			value={fat.value}
			goal={fat.goal}
		/>
	</View>
);

const Macro: React.FC<{
	barClassName: string;
	name: string;
	value: number;
	goal: number;
}> = ({ barClassName, name, value, goal }) => (
	<View className='flex-col items-center gap-y-1'>
		<Text className='text-xs text-white'>{name}</Text>
		<View className='h-1.5 w-16 flex-row overflow-hidden rounded-3xl bg-zinc-900'>
			<View
				className={'h-full ' + barClassName}
				style={{
					width: `${(value / goal) * 100}%`,
				}}
			/>
		</View>
		<Text className='text-xs text-white'>
			{value} / {goal}g
		</Text>
	</View>
);

export default Macros;
