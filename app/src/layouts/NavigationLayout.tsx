import { SafeAreaView, View, Text, Pressable } from 'react-native';
import { BookIcon, PieChartIcon } from 'src/icons/solid';
import { PlusIcon } from 'src/icons/outline';
import { Link } from 'expo-router';

const NavigationLayout: React.FC<{
	children: React.ReactNode;
	tab: 'diary' | 'progress';
}> = ({ children, tab }) => {
	return (
		<View className='h-full w-full flex-col'>
			<View className='flex-1'>{children}</View>
			<SafeAreaView className='bg-gray-800'>
				<View className='relative w-full flex-row justify-center'>
					<Link
						href='/src/screens/search-food/SearchFood'
						onPress={() => {
							console.log('pressed');
						}}
						className='absolute -top-6'
					>
						<Pressable className='rounded-full bg-purple-300 p-3 '>
							<PlusIcon svgClassName='w-8 h-8 text-white' />
						</Pressable>
					</Link>
				</View>
				<View className='flex flex-row items-center justify-around py-4'>
					<NavigationItem
						href='/screens/diary/Diary'
						name='Diary'
						selected={tab === 'diary'}
					>
						<BookIcon
							svgClassName={
								'w-6 h-6 ' +
								(tab === 'diary'
									? 'text-purple-300'
									: 'text-gray-200')
							}
						/>
					</NavigationItem>
					<NavigationItem
						href='/screens/progress/Progress'
						name='Progress'
						selected={tab === 'progress'}
					>
						<PieChartIcon
							svgClassName={
								'w-6 h-6 ' +
								(tab === 'progress'
									? 'text-purple-300'
									: 'text-gray-200')
							}
						/>
					</NavigationItem>
				</View>
			</SafeAreaView>
		</View>
	);
};

const NavigationItem: React.FC<{
	children: React.ReactNode;
	href: string;
	name: string;
	selected: boolean;
}> = ({ children, name, href, selected }) => (
	<Link href={href}>
		<View className='flex flex-col items-center'>
			{children}
			<Text
				className={
					'text-xs ' +
					(selected ? 'text-purple-300' : 'text-gray-200')
				}
			>
				{name}
			</Text>
		</View>
	</Link>
);

export default NavigationLayout;
