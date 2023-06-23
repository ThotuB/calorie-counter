import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import TitleLayout from 'src/layouts/TitleLayout';

const InviteFriends = () => {
	const [copied, setCopied] = useState(false);

	return (
		<TitleLayout title='Invite Friend' back>
			<View className='flex-col items-center gap-y-4 px-3 py-4'>
				<View className='flex-col items-center gap-y-2'>
					<Text className='text-2xl font-semibold text-white'>
						Share Calory with friends
					</Text>
					<Text className='text-center text-base font-medium text-white'>
						Help your friends start a healthier and happier life
						with the Calory app.
					</Text>
				</View>
				<View className='w-full flex-col gap-y-2'>
					<Pressable className='w-full flex-row items-center justify-center rounded-lg bg-green-500 py-4'>
						<Text className='text-base font-semibold text-white'>
							SHARE INVITE
						</Text>
					</Pressable>
					<Text className='text-center font-medium text-zinc-300'>
						Or copy your link
					</Text>
					<Pressable
						className='w-full flex-row items-center justify-between rounded-lg bg-zinc-800 px-5 py-4'
						onPress={() => setCopied(true)}
					>
						<Text className='text-base font-semibold text-white'>
							www.calory.com/invite
						</Text>
						<Text className='text-base font-bold text-green-500'>
							{copied ? 'COPIED!' : 'COPY'}
						</Text>
					</Pressable>
				</View>
			</View>
		</TitleLayout>
	);
};

export default InviteFriends;
