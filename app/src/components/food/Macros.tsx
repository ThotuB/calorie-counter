import { View, Text } from 'react-native';
import React from 'react';
import { useMeals } from 'src/contexts/MealContext';
import { daily } from 'src/utils/daily';

const Macros: React.FC<{
}> = () => {
	const { meals } = useMeals();

	const { carbs, protein, fat } = daily(meals);

	return (<View className='flex-row justify-between'>
		<Macro
			barClassName='bg-orange-300'
			name='Carbs'
			value={carbs}
			goal={10}
		/>
		<Macro
			barClassName='bg-pink-300'
			name='Protein'
			value={protein}
			goal={20}
		/>
		<Macro
			barClassName='bg-purple-300'
			name='Fat'
			value={fat}
			goal={300}
		/>
	</View>)
}

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
			{value.toFixed(0)} / {goal}g
		</Text>
	</View>
);

export default Macros;
