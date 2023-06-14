import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
	Pressable,
	SafeAreaView,
	Image,
	Text,
	View,
	ImageSourcePropType,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Water from 'src/components/diary/Water';
import Macros from 'src/components/food/Macros';
import { page } from 'src/constants/routes/app';
import {
	BellIcon,
	CalendarIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	DotsHorizontalIcon,
	PlusIcon,
	UserIcon,
} from 'src/icons/outline';
import NavigationLayout from 'src/layouts/NavigationLayout';
import { getMealsForDay } from 'src/services/meal';
import { Meal } from 'src/types/meal';
import { dateToYYYYMMDD } from 'src/utils/date';

const Diary: React.FC = () => {
	const router = useRouter();
	const [date, setDate] = useState(dateToYYYYMMDD(new Date()));

	const { data: meals, isLoading } = useQuery(["meal", 12, date], () => getMealsForDay(12, date))

	return (
		<NavigationLayout tab='diary' >
			<View className='h-full w-full bg-emerald-400'>
				<SafeAreaView className='sticky w-full'>
					<View className='flex-row justify-end gap-x-4 px-6 py-4'>
						<Pressable
							onPress={() => router.push(page.home.profile)}
						>
							<UserIcon
								svgClassName='w-6 h-6 text-white'
								strokeWidth={2}
							/>
						</Pressable>
						<Pressable
							onPress={() => router.push(page.home.notifications)}
						>
							<BellIcon svgClassName='w-6 h-6 text-white'
								strokeWidth={2}
							/>
						</Pressable>
					</View>
				</SafeAreaView>

				<ScrollView className='bg-zinc-900'>
					<View className='flex-row items-center justify-evenly py-4 bg-emerald-400'>
						<View className='flex-col items-center gap-1'>
							<Text className='text-3xl text-white'>0</Text>
							<Text className='text-xs text-white'>EATEN</Text>
						</View>

						<View className='aspect-square w-40 flex-col items-center justify-center rounded-full border-4 border-zinc-900/50'>
							<Text className='text-4xl text-white'>2568</Text>
							<Text className='mt-1 text-xs text-white'>
								CALORIES
							</Text>
						</View>

						<View className='flex-col items-center gap-1'>
							<Text className='text-3xl text-white'>0</Text>
							<Text className='text-xs text-white'>BURNED</Text>
						</View>
					</View>

					<LinearGradient
						className='flex-1 px-4'
						colors={['#rgb(52 211 153)', '#rgb(24 24 27)']}
						locations={[0.3, 0.7]}
					>
						<View className='flex-col items-center gap-y-2'>
							<View className='flex-row gap-x-2'>
								<Text className='text-white'>SEE STATS</Text>
								<View>
									<ChevronDownIcon
										svgClassName='w-4 h-4 text-white'
										strokeWidth={3}
									/>
								</View>
							</View>
							<View className='w-full'>
								<Card>
									<Macros
										carbs={{
											value: 20,
											goal: 10,
										}}
										protein={{
											value: 30,
											goal: 50,
										}}
										fat={{
											value: 320,
											goal: 540,
										}}
									/>
								</Card>
							</View>

						</View>
					</LinearGradient>
					<View className='w-full px-4'>
						<View className='flex-row justify-between'>
							<Pressable>
								<ChevronLeftIcon svgClassName='w-6 h-6 text-white' />
							</Pressable>
							<View className='flex-row items-center gap-x-2'>
								<View>
									<CalendarIcon svgClassName='w-4 h-4 text-white' />
								</View>
								<Text className='text-zinc-300'>
									TODAY, 02 MAY
								</Text>
							</View>
							<Pressable>
								<ChevronRightIcon svgClassName='w-6 h-6 text-white' />
							</Pressable>
						</View>
						<View className='w-full flex-col items-center'>
							<MealCard
								title='Breakfast'
								meals={meals?.filter((meal) => meal.meal_type === 'breakfast') || []}
								iconSource={require('assets/food/breakfast.png')}
							/>
							<MealCard
								title='Lunch'
								meals={meals?.filter((meal) => meal.meal_type === 'lunch') || []}
								iconSource={require('assets/food/lunch.png')}
							/>
							<MealCard
								title='Dinner'
								meals={meals?.filter((meal) => meal.meal_type === 'dinner') || []}
								iconSource={require('assets/food/dinner.png')}
							/>
							<MealCard
								title='Snack'
								meals={meals?.filter((meal) => meal.meal_type === 'snack') || []}
								iconSource={require('assets/food/popcorn.png')}
							/>
							<Card>
								<Water />
							</Card>
						</View>
					</View>
				</ScrollView>
			</View>
		</NavigationLayout >
	);
};

const MealCard: React.FC<{
	iconSource: ImageSourcePropType;
	meals: Meal[];
	title: string;
}> = ({ iconSource, meals, title }) => {
	const router = useRouter();

	const totalCalories = meals.reduce(
		(acc, meal) => acc + meal.food.calories,
		0,
	);

	const handleAddMeal = () => {
		router.push('/home/SearchFood');
	};

	return (
		<Card>
			<Pressable
				className='flex-row items-center justify-between'
				onPress={handleAddMeal}
			>
				<View className='flex-row items-center gap-x-4'>
					<Image source={iconSource} className='h-10 w-10' />
					<Text className='text-xl font-semibold text-white'>
						{title}
					</Text>
				</View>
				<View className='flex-row items-center justify-center rounded-full bg-zinc-900 p-2'>
					<PlusIcon
						svgClassName='w-6 h-6 text-white'
						strokeWidth={2}
					/>
				</View>
			</Pressable>
			{meals.length > 0 && (
				<>
					<View className='h-0.5 my-3 w-full rounded-full bg-zinc-700' />
					{meals.map((meal, idx) => (
						<View
							key={idx}
							className='flex-row items-center justify-between my-1'
						>
							<Text className='text-white text-xs'>{meal.food.name}</Text>
							<Text className='text-white text-xs'>{meal.food.calories} cal</Text>
						</View>
					))}
					<View className='h-0.5 my-3 w-full rounded-full bg-zinc-700' />
					<View className='flex-row justify-center' >
						<Text className='text-white text-sm font-semibold'>{totalCalories} cal
						</Text>
					</View>

				</>
			)}
		</Card>
	);
};

const Card: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => (
	<View className='my-2 flex-col w-full rounded-xl bg-zinc-800 px-6 py-4 shadow-lg'>
		{children}
	</View>
);

export default Diary;
