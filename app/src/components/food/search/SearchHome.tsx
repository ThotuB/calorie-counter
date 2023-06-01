import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import * as Haptics from 'expo-haptics';
import FoodCard from 'src/components/food/FoodCard';

const SearchHome: React.FC<{
	calories: number;
	goal: number;
}> = ({ calories, goal }) => {
	const [selected, setSelected] = useState<
		'recent' | 'frequent' | 'favorite'
	>('recent');

	const foods = [];

	return (
		<ScrollView className='h-full flex-1 bg-zinc-900 p-4'>
			<View className='flex-col rounded-xl bg-zinc-700 px-4 py-5'>
				<View className='flex-col gap-y-1'>
					<View className='flex-row justify-between'>
						<Text className='font-bold text-white'>
							Daily Intake
						</Text>
						<Text className='text-white'>
							{calories} / {goal} kcal
						</Text>
					</View>
					<View className='h-1.5 flex-row overflow-hidden rounded-3xl bg-zinc-900'>
						<View
							className='h-full bg-green-300'
							style={{
								width: `${(calories / goal) * 100}%`,
							}}
						/>
					</View>
				</View>
				<View className='mt-4 flex-row justify-between'>
					<Macro
						barClassName='bg-orange-300'
						name='Carbs'
						value={30}
						goal={321}
					/>
					<Macro
						barClassName='bg-pink-300'
						name='Protein'
						value={54}
						goal={128}
					/>
					<Macro
						barClassName='bg-purple-300'
						name='Fat'
						value={78}
						goal={86}
					/>
				</View>
			</View>
			<View className='mt-4 flex-row gap-x-4'>
				<View className='flex-1'>
					<Selectable
						selected={selected === 'recent'}
						onPress={() => setSelected('recent')}
					>
						Recent
					</Selectable>
				</View>
				<View className='flex-1'>
					<Selectable
						selected={selected === 'frequent'}
						onPress={() => setSelected('frequent')}
					>
						Frequent
					</Selectable>
				</View>
				<View className='flex-1'>
					<Selectable
						selected={selected === 'favorite'}
						onPress={() => setSelected('favorite')}
					>
						Favorites
					</Selectable>
				</View>
			</View>
			<View className='flex-col gap-y-4'>
				{foods.map((food, idx) => (
					<View key={idx}>
						<FoodCard food={food} />
					</View>
				))}
			</View>
		</ScrollView>
	);
};

const Macro: React.FC<{
	barClassName: string;
	name: string;
	value: number;
	goal: number;
}> = ({ barClassName, name, value, goal }) => (
	<View className='flex-col items-center gap-y-2'>
		<Text className='text-xs text-white'>{name}</Text>
		<View className='h-1.5 w-20 flex-row overflow-hidden rounded-3xl bg-zinc-900'>
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

const Selectable: React.FC<{
	children: React.ReactNode;
	selected: boolean;
	onPress: () => void;
}> = ({ children, selected, onPress }) => {
	const handlePress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		onPress();
	};

	return (
		<Pressable
			className={`flex-1 flex-row justify-center rounded-xl py-1 ${
				selected ? 'bg-purple-300' : 'bg-zinc-700'
			}`}
			onPress={handlePress}
		>
			<Text
				className={`font-bold ${
					selected ? 'text-zinc-900' : 'text-gray-300'
				}`}
			>
				{children}
			</Text>
		</Pressable>
	);
};

export default SearchHome;
