import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import TitleLayout from 'src/layouts/TitleLayout';
import { Stack, useRouter } from 'expo-router';
import { ChevronRightIcon, CogIcon } from 'src/icons/outline';
import CategoryLayout from 'src/layouts/CategoryLayout';
import { page } from 'src/constants/routes/app';
import { useAuthedUser } from 'src/contexts/UserContext';

const Profile = () => {
	const router = useRouter();
	const { user } = useAuthedUser();

	const onPressSettings = () => {
		router.push(page.home.settings.settings);
	};

	return (
		<>
			<Stack.Screen
				options={{
					animation: 'slide_from_bottom',
				}}
			/>
			<TitleLayout
				title='Profile'
				rightIcon={
					<Pressable onPress={onPressSettings}>
						<CogIcon
							svgClassName='w-6 h-6 text-white'
							strokeWidth={2}
						/>
					</Pressable>
				}
				scrollable
			>
				<View className='flex-col px-4 py-3'>
					<CategoryLayout>
						<View className='flex-row gap-x-6'>
							<Image
								source={{
									uri: user.imageUrl
								}}
								className='h-16 w-16 rounded-full'
							/>
							<View className='flex-col'>
								<Text className='text-2xl font-bold text-white'>
									@{user.username}
								</Text>
								<Text className='text-base text-white'>
									{user.primaryEmailAddress?.emailAddress}
								</Text>
							</View>
						</View>
						<View className='mt-6 h-0.5 w-full bg-zinc-500' />
						<View className='flex-col gap-y-4 pb-4 pt-6'>
							<View className='flex-row justify-between'>
								<Text className='font-medium text-white'>
									Current Weight
								</Text>
								<Text className='font-semibold text-white'>
									83 kg
								</Text>
							</View>
							<View className='flex-row justify-between'>
								<Text className='font-medium text-white'>
									Goal
								</Text>
								<Text className='font-semibold text-white'>
									Maintain Weight
								</Text>
							</View>
							<View className='flex-row justify-between'>
								<Text className='font-medium text-white'>
									IDK
								</Text>
								<Text className='font-semibold text-white'>
									add something here
								</Text>
							</View>
						</View>
					</CategoryLayout>
					<View className='mt-6'>
						<CategoryLayout category='CUSTOMIZATION'>
							<View className='flex-col divide-y divide-zinc-700 -my-3'>
								<View>
									<Button
										title='Personal Details'
										href={
											page.home.settings.personal_details
										}
									/>
								</View>
								<View>
									<Button
										title='Dietary Needs & Preferences'
										href={
											page.home.settings.food_preferences
										}
									/>
								</View>
								<View>
									<Button
										title='Adjust Macronutrients'
										href={
											page.home.settings.adjust_macros
										}
									/>
								</View>
								<View>
									<Button
										title='Adjust Calories'
										href={
											page.home.settings.adjust_calories
										}
									/>
								</View>
							</View>
						</CategoryLayout>
					</View>
				</View>
			</TitleLayout>
		</>
	);
};

const Button: React.FC<{
	title: string;
	href: string;
	icon?: React.ReactNode;
}> = ({ title, href, icon }) => {
	const router = useRouter();

	return (
		<Pressable
			className='flex-row items-center justify-between py-4'
			onPress={() => router.push(href)}
		>
			<View className='flex-row items-center'>
				{icon}
				<Text className='ml-4 text-base font-medium text-white'>
					{title}
				</Text>
			</View>
			<ChevronRightIcon
				svgClassName='w-4 h-4 text-zinc-500'
				strokeWidth={3}
			/>
		</Pressable>
	);
};

export default Profile;
