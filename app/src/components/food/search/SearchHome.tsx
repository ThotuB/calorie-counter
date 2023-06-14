import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { RecentIcon } from 'src/icons/outline';
import { HeartIcon, UserPlusIcon } from 'src/icons/solid';
import FavoriteFoods from './FavoriteFoods';

const SearchHome: React.FC<{
	calories: number;
	goal: number;
}> = ({ calories, goal }) => {
	const [selected, setSelected] = useState<
		'recent' | 'custom' | 'favorite'
	>('recent');

	return (
		<ScrollView className='h-full flex-1 bg-zinc-900 p-4'>
			<View className='flex-col rounded-xl bg-zinc-800 px-4 py-5'>
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
			<View className='my-4 flex-row'>
				<View className='flex-1 mr-2'>
					<Selectable
						selected={selected === 'recent'}
						onPress={() => setSelected('recent')}
						Icon={RecentIcon}
					/>
				</View>
				<View className='flex-1 mx-2'>
					<Selectable
						selected={selected === 'custom'}
						onPress={() => setSelected('custom')}
						Icon={UserPlusIcon}
					/>
				</View>
				<View className='flex-1 ml-2'>
					<Selectable
						selected={selected === 'favorite'}
						onPress={() => setSelected('favorite')}
						Icon={HeartIcon}
					/>
				</View>
			</View>
			<View className=''>
				{selected === 'recent' ? (
					<View />
				) : selected === 'custom' ? (
					<View />
				) : (
					<FavoriteFoods userId={11} />
				)}
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
	selected: boolean;
	Icon: React.FC<{
		svgClassName: string;
	}>;
	onPress: () => void;
}> = ({ Icon, selected, onPress }) => {
	const handlePress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		onPress();
	};

	return (
		<Pressable
			className={`flex-1 flex-row justify-center rounded-xl py-1 ${selected ? 'bg-purple-300' : 'bg-zinc-800'
				}`}
			onPress={handlePress}
		>
			<Icon svgClassName={`w-5 h-5 ${selected ? 'text-zinc-900' : 'text-white'}`} />
		</Pressable>
	);
};

export default SearchHome;
