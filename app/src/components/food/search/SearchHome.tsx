import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { RecentIcon } from 'src/icons/outline';
import { HeartIcon, UserPlusIcon } from 'src/icons/solid';
import FavoriteFoods from './FavoriteFoods';
import { MealType } from 'src/types/meal-types';
import { useAuthedUser } from 'src/contexts/UserContext';
import Macros from '../Macros';
import { useQuery } from '@tanstack/react-query';
import { getDaily } from 'src/services/daily';
import { useDate } from 'src/contexts/DateContext';
import { HorizontalProgressBar } from 'src/components/graphs/ProgressBar';
import RecentFoods from './RecentFood';
import CustomFoods from './CustomFoods';
import { useRouter } from 'expo-router';
import { page } from 'src/constants/routes/app';

const SearchHome: React.FC<{
	mealType: MealType;
}> = ({ mealType }) => {
	const router = useRouter()
	const { user } = useAuthedUser();
	const { dateYMD } = useDate();

	const { data: daily, isLoading } = useQuery(["daily", user.id, dateYMD], () => getDaily(user.id, dateYMD))

	const [selected, setSelected] = useState<
		'recent' | 'custom' | 'favorite'
	>('recent');

	return (
		<>
			<ScrollView className='h-full flex-1 bg-zinc-900 p-4'>
				<View className='flex-col'>
					<View className='flex-col rounded-xl bg-zinc-800 px-4 py-5'>
						<View className='flex-col'>
							<View className='flex-row justify-between'>
								<Text className='font-bold text-white'>
									Daily Intake
								</Text>
								<Text className='text-white'>
									{daily?.calories || 0} / {daily?.calories_goal || 0} kcal
								</Text>
							</View>
							<View className='h-1.5 mt-1 w-full overflow-hidden rounded-3xl bg-zinc-900'>
								<HorizontalProgressBar
									barClassName='h-full bg-calories'
									value={daily?.calories || 0}
									goal={daily?.calories_goal || 0}
								/>
							</View>
						</View>
						<View className='mt-4 flex-row justify-between'>
							<Macros
								carbs={daily?.carbs}
								protein={daily?.protein}
								fat={daily?.fat}
								carbsGoal={daily?.carbs_goal}
								proteinGoal={daily?.protein_goal}
								fatGoal={daily?.fat_goal}
							/>
						</View>
					</View>
					<View className='my-4 h-7 flex-row'>
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
					<View className='w-full flex-col pb-10'>
						{selected === 'recent' ? (
							<RecentFoods mealType={mealType} />
						) : selected === 'custom' ? (
							<CustomFoods userId={user.id} mealType={mealType} />
						) : (
							<FavoriteFoods userId={user.id} mealType={mealType} />
						)}
					</View>
				</View>
			</ScrollView>

			{selected === 'custom' && <View className='w-full flex-col absolute bottom-0 px-4'>
				<Pressable
					className='w-full bg-emerald-300 flex-row justify-center py-4 rounded-lg'
					style={{
						shadowColor: 'rgb(24 24 27)',
						shadowOffset: {
							width: 0,
							height: -15,
						},
						shadowOpacity: 1,
						shadowRadius: 10,
					}}
					onPress={() => router.push(page.food.create_food)}
				>
					<Text className='text-base font-bold text-zinc-900'>
						ADD CUSTOM FOOD
					</Text>
				</Pressable>
				<View className='h-8 bg-zinc-900' />
			</View>}
		</>);
};

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
			className={`flex-1 h-7 flex-row justify-center rounded-xl py-1 ${selected ? 'bg-emerald-300' : 'bg-zinc-800'}`}
			onPress={handlePress}
		>
			<Icon svgClassName={`w-5 h-5 ${selected ? 'text-zinc-900' : 'text-white'}`} />
		</Pressable>
	);
};

export default SearchHome;
