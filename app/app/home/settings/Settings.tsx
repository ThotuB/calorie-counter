import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import React from 'react';
import TitleLayout from 'src/layouts/TitleLayout';
import { useRouter } from 'expo-router';
import { page } from 'src/constants/routes/app';
import { Section, SimpleSectionItem } from 'src/components/settings/Section';

const Settings = () => {
	const router = useRouter();

	const onLogOut = () => {
		router.push(page.auth.authentication);
	};

	return (
		<TitleLayout title='Settings' back scrollable safe padded>
			<Section title='ACCOUNT'>
				<SimpleSectionItem
					leftText='Invite Friends'
					onPress={() => router.push(page.home.settings.invite_friends)}
				/>
				<SimpleSectionItem
					leftText='Account Settings'
					onPress={() => router.push(page.home.settings.account_settings)}
				/>
				<SimpleSectionItem leftText='Account Type' onPress={() => router.push('/')} />
				<SimpleSectionItem leftText='Restore Purchases' onPress={() => router.push('/')} />
			</Section>
			<Section title='DIARY AND NOTIFICATIONS'>
				<SimpleSectionItem
					leftText='Diary Settings'
					onPress={() => router.push(page.home.settings.diary_settings)}
				/>
				<SimpleSectionItem leftText='Notifications' onPress={() => router.push('/')} />
			</Section>
			<Section title='IMPORT HEALTH DATA'>
				<SimpleSectionItem leftText='Automatic Tracking' onPress={() => router.push(page.home.settings.automatic_tracking)} />
			</Section>
			<Section title='HELP'>
				<SimpleSectionItem leftText='Support' onPress={() => router.push('/')} />
				<SimpleSectionItem leftText='Terms & Conditions' onPress={() => router.push('/')} />
				<SimpleSectionItem leftText='Privacy Policy' onPress={() => router.push('/')} />
			</Section>
			<View className='mt-16 flex-col items-center'>
				<Pressable
					className='rounded-full border-2 border-zinc-300 px-16 py-2'
					onPress={onLogOut}
				>
					<Text className='text-base font-medium text-zinc-300'>
						LOG OUT
					</Text>
				</Pressable>
			</View>
		</TitleLayout>
	);
};


export default Settings;
