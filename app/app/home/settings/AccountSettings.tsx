import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import TitleLayout from 'src/layouts/TitleLayout';
import {
	Section,
	SectionItemLayout,
	SimpleSectionItem,
} from 'src/components/settings/Section';

const AccountSettings = () => {
	return (
		<TitleLayout title='Account Settings' back scrollable safe padded>
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
	);
};

export default AccountSettings;
