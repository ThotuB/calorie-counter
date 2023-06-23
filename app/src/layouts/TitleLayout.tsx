import { View, Text, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { ChevronLeftIcon, XIcon } from 'src/icons/outline';
import { useRouter } from 'expo-router';
import { page } from 'src/constants/routes/app';

const TitleLayout: React.FC<{
	children: React.ReactNode;
	title: string;
	back?: boolean;
	rightIcon?: React.ReactNode;
	scrollable?: boolean;
	safe?: boolean;
	padded?: boolean;
}> = ({ children, title, back = false, rightIcon, scrollable, safe, padded }) => {
	const router = useRouter();

	const Layout = safe ? SafeAreaView : View;
	const Scroll = scrollable ? ScrollView : View;

	const onPressBack = () => {
		back ? router.back() : router.push(page.home.diary);
	};

	return (
		<View className='h-full w-full flex-col bg-zinc-900'>
			<SafeAreaView className='sticky bg-zinc-800'>
				<View className='w-full flex-row items-center justify-between px-4 py-3'>
					<Pressable onPress={onPressBack}>
						{back ? (
							<ChevronLeftIcon
								svgClassName='w-6 h-6 text-white'
								strokeWidth={2.5}
							/>
						) : (
							<XIcon
								svgClassName='w-6 h-6 text-white'
								strokeWidth={2.5}
							/>
						)}
					</Pressable>
					<Text className='text-base font-bold text-white'>
						{title}
					</Text>
					{rightIcon ? rightIcon : <View className='h-6 w-6' />}
				</View>
			</SafeAreaView>
			<Layout className='flex-1'>
				<Scroll className={'flex-1'}>
					<View className={padded ? 'px-4 py-3' : ''}>
						{children}
					</View>
				</Scroll>
			</Layout>
		</View>
	);
};

export default TitleLayout;
