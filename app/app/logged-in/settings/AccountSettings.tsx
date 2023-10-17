import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import React from 'react';
import TitleLayout from 'src/layouts/TitleLayout';
import {
	Section,
	SectionItemLayout,
	SimpleSectionItem,
} from 'src/components/settings/Section';
import { useAuthedUser } from 'src/contexts/UserContext';
import CategoryLayout from 'src/layouts/CategoryLayout';
import { AppleIcon, GoogleIcon } from 'src/icons/social';
import { useAuth } from '@clerk/clerk-expo';

const AccountSettings = () => {
	const { user } = useAuthedUser();
	const { signOut } = useAuth();

	return (
		<>
			<TitleLayout title='Personal Details' back safe padded>
				<Section title='DETAILS'>
					<SimpleSectionItem
						leftText='Email'
						rightText='bogdantatu10@gmail.com'
					/>
					<SimpleSectionItem
						leftText='First Name'
						rightText='Bogdan'
					/>
					<SimpleSectionItem
						leftText='Last Name'
						rightText='Tatu'
					/>
					<SimpleSectionItem
						leftText='password'
						rightText='********'
					/>
					<SimpleSectionItem
						leftText='Unit System'
						rightText='European System'
					/>
					<SimpleSectionItem
						leftText='Language'
						rightText='English'
					/>
				</Section>
				{user.externalAccounts.length > 0 && (
					<Section title='SOCIALS'>
						<View className='flex-row items-center mb-1'>
							{user.externalAccounts.map((account, _) => (
								<>
									{account.provider === 'apple' && <AppleIcon key={1} svgClassName='mx-2 w-8 h-8 text-white' />}
									{account.provider === 'google' && <GoogleIcon key={2} svgClassName='mx-2 w-8 h-8' />}
								</>
							))}
						</View>
					</Section>
				)}
				<Section>
					<SectionItemLayout>
						<Text className='text-base font-semibold text-red-400'>
							Reset Data
						</Text>
					</SectionItemLayout>
					<SectionItemLayout>
						<Text className='text-base font-semibold text-red-400'>
							Delete Account
						</Text>
					</SectionItemLayout>
				</Section>
			</TitleLayout>
			<View className='absolute bottom-0 w-full px-4 mb-12'>
				<Pressable className="bg-emerald-300 rounded-3xl bottom-0 w-full"
					onPress={() => signOut()}
				>
					<Text className='text-center text-zinc-900 text-xl font-bold py-4'>
						LOG OUT
					</Text>
				</Pressable>
			</View>
		</>
	);
};

export default AccountSettings;
