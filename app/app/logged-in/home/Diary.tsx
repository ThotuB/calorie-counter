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
import For from 'src/components/util/For';
import Show from 'src/components/util/Show';
import { page } from 'src/constants/routes/app';
import { useMeals } from 'src/contexts/MealContext';
import {
	BellIcon,
	CalendarIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	PlusIcon,
	UserIcon,
} from 'src/icons/outline';
import NavigationLayout from 'src/layouts/NavigationLayout';
import { Meal, MealType } from 'src/types/meal';
import { daily } from 'src/utils/daily';

const Diary: React.FC = () => {
	const router = useRouter();

	const { meals, date, changeDate } = useMeals();

	const { calories } = daily(meals);

	const onPressTomorrow = () => {
		const tomorrow = new Date(date);
		tomorrow.setDate(tomorrow.getDate() + 1);
		changeDate(tomorrow);
	};

	const onPressYesterDay = () => {
		const yesterday = new Date(date);
		yesterday.setDate(yesterday.getDate() - 1);
		changeDate(yesterday);
	};

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
							<Text className='text-3xl text-white'>{calories}</Text>
							<Text className='text-xs text-white'>EATEN</Text>
						</View>

						<View className='aspect-square w-40 flex-col items-center justify-center rounded-full border-4 border-zinc-900/50'>
							<Text className='text-4xl text-white'>{2568 - calories}</Text>
							<Text className='mt-1 text-xs text-white'>
								CALORIES LEFT
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
									<Macros />
								</Card>
							</View>

						</View>
					</LinearGradient>
					<View className='w-full px-4'>
						<View className='flex-row justify-between py-2'>
							<Pressable
								onPress={onPressYesterDay}
							>
								<ChevronLeftIcon svgClassName='w-6 h-6 text-white' />
							</Pressable>
							<View className='flex-row items-center gap-x-2'>
								<View>
									<CalendarIcon svgClassName='w-4 h-4 text-white' />
								</View>
								<Text className='text-zinc-300'>
									{date.toDateString()}
								</Text>
							</View>
							<Pressable
								onPress={onPressTomorrow}
							>
								<ChevronRightIcon svgClassName='w-6 h-6 text-white' />
							</Pressable>
						</View>
						<View className='w-full flex-col items-center'>
							<MealCard
								title='Breakfast'
								mealType='breakfast'
								meals={meals?.filter((meal) => meal.meal_type === 'breakfast') || []}
								iconSource={require('assets/food/breakfast.png')}
							/>
							<MealCard
								title='Lunch'
								mealType='lunch'
								meals={meals?.filter((meal) => meal.meal_type === 'lunch') || []}
								iconSource={require('assets/food/lunch.png')}
							/>
							<MealCard
								title='Dinner'
								mealType='dinner'
								meals={meals?.filter((meal) => meal.meal_type === 'dinner') || []}
								iconSource={require('assets/food/dinner.png')}
							/>
							<MealCard
								title='Snack'
								mealType='snack'
								meals={meals?.filter((meal) => meal.meal_type === 'snack') || []}
								iconSource={require('assets/food/popcorn.png')}
							/>
							<View className='py-2 w-full'>
								<Card>
									<Water />
								</Card>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		</NavigationLayout >
	);
};

const MealCard: React.FC<{
	iconSource: ImageSourcePropType;
	mealType: MealType;
	meals: Meal[];
	title: string;
}> = ({ iconSource, mealType, meals, title }) => {
	const router = useRouter();

	const [open, setOpen] = useState(true);

	const totalCalories = meals.reduce(
		(acc, meal) => acc + meal.food.calories,
		0,
	);

	const handleAddMeal = () => {
		router.push({
			pathname: page.home.search_food,
			params: {
				mealType,
			}
		});
	};

	return (
		<View className='w-full py-2'>
			<Card>
				<Pressable
					className='flex-row items-center justify-between h-10'
					onPress={() => setOpen(!open)}
				>
					<View className='flex-row items-center gap-x-4'>
						<Image source={iconSource} className='h-10 w-10' />
						<View className='flex-col'>
							<Text className='text-xl font-semibold text-white'>
								{title}
							</Text>
							<Show when={meals.length > 0 && !open}>
								<Text className='text-xs text-zinc-300'>
									{meals.length} foods - {totalCalories} calories
								</Text>
							</Show>
						</View>
					</View>
					<Pressable className='flex-row items-center justify-center rounded-full bg-zinc-900 p-2'
						onPress={handleAddMeal}
					>
						<PlusIcon
							svgClassName='w-6 h-6 text-white'
							strokeWidth={2}
						/>
					</Pressable>
				</Pressable>
			</Card>
			<Show when={meals.length > 0 && open}>
				<View className='mx-4 bg-zinc-700 py-1 px-3'>
					{meals.map((meal, idx) => (
						<View
							key={idx}
							className='flex-row items-center justify-between my-1'
						>
							<Text className='text-white text-xs flex-1'>
								{meal.food.name}</Text>
							<Text className='text-white font-medium text-xs ml-3'>{meal.food.calories} cal</Text>
						</View>
					))}
				</View>
				<View className='mx-4 bg-zinc-700 rounded-b-2xl' >
					<View className='flex-row justify-between'>
						<For times={8} item={(
							<View className='h-1 w-8 bg-zinc-900' />
						)} />
					</View>
					<View className='flex-row justify-center py-2' >
						<Text className='text-white text-sm font-semibold'>{totalCalories} calories</Text>
					</View>
				</View>
			</Show>
		</View>
	);
};

const Card: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => (
	<View className='flex-col w-full rounded-xl bg-zinc-800 px-6 py-4 shadow-lg'>
		{children}
	</View>
);

export default Diary;
