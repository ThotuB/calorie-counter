import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, SafeAreaView } from 'react-native';
import NavigationLayout from 'src/layouts/NavigationLayout';
import {
	UserIcon,
	BellIcon,
	ChevronLeftIcon,
	CalendarIcon,
	ChevronRightIcon,
} from 'src/icons/outline';

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
				<View className='flex-row items-center justify-evenly py-4'>
					<View className='flex-col items-center gap-1'>
						<Text className='text-3xl text-white'>0</Text>
						<Text className='text-xs text-white'>EATEN</Text>
					</View>

					<View className='aspect-square w-40 flex-col items-center justify-center rounded-full border-4 border-gray-900/50'>
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
					colors={['#00000000', '#rgb(17 24 39)']}
					locations={[0.1, 0.2]}
				>
					<View className='flex-col items-center gap-y-2'>
						<View className='flex-row gap-x-2'>
							<Text className='text-white'>SEE STATS</Text>
							<Text className='text-white'>V</Text>
						</View>
						<View className='w-full'>
							<Card>
								<View className='flex-row justify-between'>
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
							</Card>
						</View>

						<View className='w-full flex-row justify-between'>
							<ChevronLeftIcon svgClassName='w-6 h-6 text-white' />
							<View className='flex-row items-center gap-x-2'>
								<View>
									<CalendarIcon svgClassName='w-4 h-4 text-white' />
								</View>
								<Text className='text-gray-300'>
									TODAY, 02 MAY
								</Text>
							</View>
							<ChevronRightIcon svgClassName='w-6 h-6 text-white' />
						</View>
					</View>
				</LinearGradient>
			</View>
		</NavigationLayout>
	);
};

const Card: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => (
	<View className='my-2 w-full rounded-xl bg-gray-700 px-6 py-4 shadow-lg'>
		{children}
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
		<View className='h-1.5 w-16 flex-row overflow-hidden rounded-3xl bg-gray-900'>
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

export default Diary;
