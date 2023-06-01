import { View, Text, Pressable } from 'react-native';
import React from 'react';
import CreateAccountLayout from 'src/layouts/CreateAccountLayout';
import { useRouter } from 'expo-router';
import { page } from 'src/constants/routes/app';
import TermsOfService from 'src/components/auth/TermsOfService';

const SignUp = () => {
	const router = useRouter();

	const handleSignInWithEmail = () => {
		router.push(page.auth.accout_setup.email_auth_create);
	};

	return (
		<CreateAccountLayout progress={6} question='Let’s get started!'>
			<View className='flex-1 flex-col justify-end'>
				<View className='flex-col gap-y-4'>
					<Pressable className='w-full flex-row justify-center rounded-xl bg-zinc-100 py-4'>
						<Text className='text-base font-bold text-zinc-900'>
							SIGN IN WITH APPLE
						</Text>
					</Pressable>
					<Pressable className='w-full flex-row justify-center rounded-xl bg-zinc-100 py-4'>
						<Text className='text-base font-bold text-zinc-900'>
							SIGN IN WITH GOOGLE
						</Text>
					</Pressable>
					<Pressable
						className='w-full flex-row justify-center rounded-xl bg-zinc-700 py-4'
						onPress={handleSignInWithEmail}
					>
						<Text className='text-base font-bold text-zinc-100'>
							CONTINUE WITH EMAIL
						</Text>
					</Pressable>
				</View>
				<TermsOfService />
			</View>
		</CreateAccountLayout>
	);
};

export default SignUp;
