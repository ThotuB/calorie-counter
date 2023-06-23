import {
	SafeAreaView,
	View,
	Text,
	Pressable
} from 'react-native';
import { BarChartIcon, BookIcon, CogIcon, PieChartIcon, UserIcon } from 'src/icons/solid';
import { PlusIcon } from 'src/icons/outline';
import { Link, useRouter } from 'expo-router';
import { page } from 'src/constants/routes/app';
import { useState } from 'react';
import AddModal from 'src/components/nav-layout/AddModal';

type Tabs = 'diary' | 'stats' | 'progress' | 'profile';

const NavigationLayout: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [tab, setTab] = useState<Tabs>('diary');

	return (
		<View className='h-full w-full flex-col'>
			<View className='flex-1'>
				{children}
			</View>
			<SafeAreaView className='bg-zinc-800'>
				<View className='relative w-full flex-row justify-center'>
					<Pressable
						className='absolute -top-6'
						onPress={() => setOpen(true)}
						hitSlop={30}
					>
						<View className='rounded-full bg-emerald-300 p-2 '>
							<PlusIcon
								svgClassName='w-10 h-10 text-white'
								strokeWidth={3}
							/>
						</View>
					</Pressable>
				</View>
				<View className='flex-row items-center py-4'>
					<View className='flex-1 flex-row items-center justify-around'>
						<NavigationItem
							href={page.home.diary}
							name='Diary'
							selected={tab === 'diary'}
							value='diary'
							onPress={setTab}
							Icon={BookIcon} />
						<NavigationItem
							href={page.home.stats}
							name='Stats'
							selected={tab === 'stats'}
							value='stats'
							onPress={setTab}
							Icon={PieChartIcon} />
					</View>
					<View className='w-10' />
					<View className='flex-1 flex-row items-center justify-around'>
						<NavigationItem
							href={page.home.progress}
							name='Progress'
							selected={tab === 'progress'}
							value='progress'
							onPress={setTab}
							Icon={BarChartIcon} />
						<NavigationItem
							href={page.home.profile}
							name='Profile'
							selected={tab === 'profile'}
							value='profile'
							onPress={setTab}
							Icon={UserIcon} />
					</View>
				</View>
			</SafeAreaView>

			<AddModal open={open} close={() => setOpen(false)} />
		</View>
	);
};

const NavigationItem: React.FC<{
	href: string;
	name: string;
	selected: boolean;
	value: Tabs;
	onPress: (value: Tabs) => void;
	Icon: React.ComponentType<{ svgClassName: string }>;
}> = ({ name, href, selected, value, onPress, Icon }) => {
	const router = useRouter()

	const handlePress = () => {
		onPress(value);
		router.push(href);
	};

	return (
		<Pressable
			className='flex-col items-center'
			onPress={handlePress}
		>
			<Icon svgClassName={`w-6 h-6 ${selected ? 'text-emerald-300' : 'text-zinc-200'}`} />
			<Text
				className={
					'text-xs ' +
					(selected ? 'text-emerald-300' : 'text-zinc-200')
				}
			>
				{name}
			</Text>
		</Pressable>
	);
}

export default NavigationLayout;
