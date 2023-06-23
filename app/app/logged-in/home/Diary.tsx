import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
	Pressable,
	Text,
	View,
	NativeSyntheticEvent,
	NativeScrollEvent,
	ImageBackground,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BigDaily from 'src/components/diary/BigDaily';
import ColorChangingHeader from 'src/components/diary/ColorChangingHeader';
import ColorChangingText from 'src/components/diary/ColorChangingText';
import MealCard from 'src/components/diary/MealCard';
import StepCounter from 'src/components/diary/StepCounter';
import Water from 'src/components/diary/Water';
import Macros from 'src/components/food/Macros';
import { page } from 'src/constants/routes/app';
import { useDate } from 'src/contexts/DateContext';
import { useAuthedUser } from 'src/contexts/UserContext';
import {
	CalendarIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	CogIcon,
} from 'src/icons/outline';
import NavigationLayout from 'src/layouts/NavigationLayout';
import { getDaily } from 'src/services/daily';

const Diary: React.FC = () => {
	const router = useRouter();
	const { user } = useAuthedUser();
	const { date, dateYMD, setYesterday, setTomorrow, day } = useDate();

	const [headerTransition, setHeaderTransition] = useState(false);

	const { data: daily, isLoading } = useQuery(["daily", user.id, dateYMD], () => getDaily(user.id, dateYMD))

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { y } = event.nativeEvent.contentOffset;
		if (y > 240 && !headerTransition) {
			setHeaderTransition(true);
		}
		else if (y <= 240 && headerTransition) {
			setHeaderTransition(false);
		}
	}

	return (
		<ImageBackground
			source={require('assets/gradients/gradient-1.png')}
			className='h-full w-full'
			resizeMode='cover'
		>

			<ColorChangingHeader isChanging={headerTransition}>
				<View className='flex-row items-center justify-between px-6 py-4'>
					<View className='w-6' />
					<ColorChangingText
						text='Calory'
						isChanging={headerTransition}
					/>
					<Pressable onPress={() => router.push(page.home.settings.settings)}>
						<CogIcon svgClassName='w-6 h-6 text-white'
							strokeWidth={2}
						/>
					</Pressable>
				</View>
			</ColorChangingHeader>

			<ScrollView className='flex-col'
				onScroll={handleScroll}
				scrollEventThrottle={50}
			>
				<BigDaily eaten={daily?.calories} goal={daily?.calories_goal} isLoading={isLoading} />

				<LinearGradient
					className='flex-1 px-4'
					colors={['#rgba(0, 0, 0, 0)', '#rgba(24, 24, 27, 100)']}
					locations={[0.3, 0.7]}
				>
					<View className='flex-col items-center gap-y-2'>
						<View className='w-full'>
							<Card>
								<Macros
									carbs={daily?.carbs}
									carbsGoal={daily?.carbs_goal}
									protein={daily?.protein}
									proteinGoal={daily?.protein_goal}
									fat={daily?.fat}
									fatGoal={daily?.fat_goal}
								/>
							</Card>
						</View>

					</View>
				</LinearGradient>
				<View className='w-full px-4 pb-8 bg-zinc-900'>
					<View className='flex-row justify-between items-center py-2'>
						<Pressable
							onPress={setYesterday}
						>
							<ChevronLeftIcon svgClassName='my-2 w-4 h-4 text-white' strokeWidth={3} />
						</Pressable>
						<View className='flex-row items-center gap-x-2'>
							<View>
								<CalendarIcon svgClassName='w-4 h-4 text-white' />
							</View>
							<Text className='font-medium text-zinc-300'>
								{day.toUpperCase()}
							</Text>
						</View>
						<Pressable
							onPress={setTomorrow}
						>
							<ChevronRightIcon svgClassName='my-2 w-4 h-4 text-white' strokeWidth={3} />
						</Pressable>
					</View>
					<View className='w-full flex-col items-center'>
						<MealCard
							title='Breakfast'
							mealType='breakfast'
							meal={daily?.breakfast}
							iconSource={require('assets/food/breakfast.png')}
						/>
						<MealCard
							title='Lunch'
							mealType='lunch'
							meal={daily?.lunch}
							iconSource={require('assets/food/lunch.png')}
						/>
						<MealCard
							title='Dinner'
							mealType='dinner'
							meal={daily?.dinner}
							iconSource={require('assets/food/dinner.png')}
						/>
						<MealCard
							title='Snack'
							mealType='snack'
							meal={daily?.snack}
							iconSource={require('assets/food/popcorn.png')}
						/>
						<View className='py-2 w-full'>
							<Card>
								<Water />
							</Card>
						</View>
						<View className='py-2 w-full'>
							<Card>
								<StepCounter />
							</Card>
						</View>
					</View>
				</View>
			</ScrollView>

		</ImageBackground>
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
