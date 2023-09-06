import { View, Text, Pressable, Image, ImageBackground } from 'react-native';
import React, { useMemo } from 'react';
import { Stack, useRouter } from 'expo-router';
import { ChevronRightIcon } from 'src/icons/outline';
import CategoryLayout from 'src/layouts/CategoryLayout';
import { page } from 'src/constants/routes/app';
import { useAuthedUser } from 'src/contexts/UserContext';
import { AppleIcon, GoogleIcon } from 'src/icons/social';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChartIcon, FlameIcon, RoomServiceIcon, UserIcon, WaterIcon } from 'src/icons/solid';

const Profile = () => {
	const { user } = useAuthedUser();

	const image = useMemo(() => require('assets/gradients/gradient-5.jpg'), []);

	return (
		<ImageBackground
			source={image}
		>
			<SafeAreaView className='h-full w-full'>
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
									Member Since
								</Text>
								<Text className='font-semibold text-white'>
									{user.createdAt?.toLocaleDateString('en-US', {
										weekday: 'long',
										month: 'short',
										day: 'numeric',
									})}
								</Text>
							</View>
						</View>
					</CategoryLayout>

					{/* {user.externalAccounts.length > 0 && (
						<View className='mt-6'>
							<CategoryLayout category='SOCIALS'>
								<View className='flex-row items-center'>
									{user.externalAccounts.map((account, _) => (
										<>
											{account.provider === 'apple' && <AppleIcon key={1} svgClassName='mx-2 w-8 h-8 text-white' />}
											{account.provider === 'google' && <GoogleIcon key={2} svgClassName='mx-2 w-8 h-8' />}
										</>
									))}
								</View>
							</CategoryLayout>
						</View>
					)} */}

					<View className='mt-6'>
						<CategoryLayout category='CUSTOMIZATION'>
							<View className='flex-col divide-y divide-zinc-700 -my-3'>
								<View>
									<Button
										title='Personal Details'
										href={page.home.settings.personal_details}
										icon={<UserIcon svgClassName='w-6 h-6 text-green-400' />}
									/>
								</View>
								<View>
									<Button
										title='Dietary Needs & Preferences'
										href={page.home.settings.food_preferences}
										icon={<RoomServiceIcon svgClassName='w-6 h-6 text-green-400' />}
									/>
								</View>
								<View>
									<Button
										title='Adjust Macronutrients'
										subtitle='Carbs, Protein and Fat'
										href={page.home.settings.adjust_macros}
										icon={<BarChartIcon svgClassName='w-6 h-6 text-green-400' />}
									/>
								</View>
								<View>
									<Button
										title='Adjust Calories'
										subtitle='2500 kcal / day'
										href={page.home.settings.adjust_calories}
										icon={<FlameIcon svgClassName='w-6 h-6 text-green-400' />}
									/>
								</View>
								<View>
									<Button
										title='Water Habits'
										href={page.home.settings.water_tracker}
										icon={<WaterIcon svgClassName='w-6 h-6 text-green-400' />}
									/>
								</View>
							</View>
						</CategoryLayout>
					</View>
				</View>
			</SafeAreaView>
		</ImageBackground>
	);
};

const Button: React.FC<{
	title: string;
	subtitle?: string;
	href: string;
	icon?: React.ReactNode;
}> = ({ title, subtitle, href, icon }) => {
	const router = useRouter();

	return (
		<Pressable
			className='flex-row items-center justify-between py-4'
			onPress={() => router.push(href)}
		>
			<View className='flex-row items-center'>
				{icon}
				<View className='flex-col ml-4'>
					<Text className='text-base font-medium text-zinc-100'>
						{title}
					</Text>
					{subtitle && (
						<Text className='text-sm font-medium text-zinc-400'>
							{subtitle}
						</Text>
					)}
				</View>
			</View>
			<ChevronRightIcon
				svgClassName='w-4 h-4 text-zinc-500'
				strokeWidth={3}
			/>
		</Pressable>
	);
};

export default Profile;
