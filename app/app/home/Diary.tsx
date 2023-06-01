import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Macros from 'src/components/food/Macros';
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

const Diary: React.FC = () => {
	return (
		<NavigationLayout tab='diary'>
			<View className='h-full w-full bg-emerald-400'>
				<SafeAreaView className='sticky w-full'>
					<View className='flex-row justify-end gap-x-4 px-6 py-4'>
						<View>
							<UserIcon svgClassName='w-6 h-6 text-white' />
						</View>
						<View>
							<BellIcon svgClassName='w-6 h-6 text-white' />
						</View>
					</View>
				</SafeAreaView>

				<ScrollView className=''>
					<View className='flex-row items-center justify-evenly py-4'>
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
						colors={['#00000000', '#rgb(24 24 27)']}
						locations={[0.1, 0.2]}
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

							<View className='w-full'>
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
									<Meal title='Breakfast' />
									<Meal title='Lunch' />
									<Meal title='Dinner' />
									<Meal title='Snack' />
								</View>
							</View>
						</View>
					</LinearGradient>
				</ScrollView>
			</View>
		</NavigationLayout>
	);
};

const Meal: React.FC<{
	title: string;
}> = ({ title }) => {
	const router = useRouter();

	const handleAddMeal = () => {
		router.push('/home/SearchFood');
	};

	return (
		<Card>
			<Pressable
				className='flex-row items-center justify-between'
				onPress={handleAddMeal}
			>
				<View className='flex-row items-center gap-x-2'>
					<View />
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
		</Card>
	);
};

const Card: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => (
	<View className='my-2 w-full rounded-xl bg-zinc-700 px-6 py-4 shadow-lg'>
		{children}
	</View>
);

export default Diary;
