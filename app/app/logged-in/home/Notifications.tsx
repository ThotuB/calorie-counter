import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XIcon } from 'src/icons/outline';

const Notifications = () => {
	const router = useRouter();

	return (
		<>
			<Stack.Screen
				options={{
					animation: 'slide_from_bottom',
				}}
			/>
			<View className='h-full w-full flex-col bg-zinc-900'>
				<SafeAreaView className='sticky bg-zinc-800'>
					<View className='-mb-5 mt-3 w-full flex-row items-center justify-between px-4'>
						<Pressable onPress={() => router.back()}>
							<XIcon
								svgClassName='w-6 h-6 text-white'
								strokeWidth={2}
							/>
						</Pressable>
						<Text className='text-base font-bold text-white'>
							Notifications
						</Text>
						<View className='h-6 w-6' />
					</View>
				</SafeAreaView>
			</View>
		</>
	);
};

export default Notifications;
