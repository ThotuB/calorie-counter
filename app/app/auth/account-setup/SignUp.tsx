import { View, Text, Pressable } from 'react-native';
import React, { useCallback } from 'react';
import CreateAccountLayout from 'src/layouts/CreateAccountLayout';
import { useRouter } from 'expo-router';
import { page } from 'src/constants/routes/app';
import TermsOfService from 'src/components/auth/TermsOfService';
import { useSetup } from 'src/contexts/SetupContext';
import { useClerk } from '@clerk/clerk-expo';

const SignUp = () => {
	const router = useRouter();
	const { finaliseSetup } = useSetup();

	// 	const { startOAuthFlow: startOAuthGoogle } = useOAuth({
	// 		strategy: 'oauth_google',
	// 	});
	// 	const { startOAuthFlow: startOAuthApple } = useOAuth({
	// 		strategy: 'oauth_apple',
	// 	});
	//
	// 	const onSignUpWithApple = useCallback(async () => {
	// 		try {
	// 			const { createdSessionId, signIn, signUp, setActive } =
	// 				await startOAuthApple({});
	//
	// 			if (createdSessionId) {
	// 				setActive!({ session: createdSessionId });
	// 			} else {
	// 				// Use signIn or signUp for next steps such as MFA
	// 			}
	// 		} catch (err) {
	// 			console.error('OAuth Apple error', err);
	// 		}
	// 	}, []);
	//
	// 	const onSignUpWithGoogle = useCallback(async () => {
	// 		try {
	// 			const { createdSessionId, signIn, signUp, setActive } =
	// 				await startOAuthGoogle({});
	//
	// 			if (createdSessionId) {
	// 				setActive!({ session: createdSessionId });
	// 			} else {
	// 				// Use signIn or signUp for next steps such as MFA
	// 			}
	// 		} catch (err) {
	// 			console.error('OAuth Google error', err);
	// 		}
	// 	}, []);

	const onSignUpWithApple = async () => {
		await finaliseSetup(12);
		router.push(page.home.diary)
	};

	const onSignUpWithGoogle = async () => {
		// await logInGoogle();
	};

	const onSignUpWithEmail = () => {
		router.push(page.auth.accout_setup.email_auth_create);
	};

	return (
		<CreateAccountLayout progress={6} question='Let’s get started!'>
			<View className='flex-1 flex-col justify-end'>
				<View className='flex-col gap-y-4'>
					<Pressable
						className='w-full flex-row justify-center rounded-xl bg-zinc-100 py-4'
						onPress={onSignUpWithApple}
					>
						<Text className='text-base font-bold text-zinc-900'>
							SIGN IN WITH APPLE
						</Text>
					</Pressable>
					<Pressable
						className='w-full flex-row justify-center rounded-xl bg-zinc-100 py-4'
						onPress={onSignUpWithGoogle}
					>
						<Text className='text-base font-bold text-zinc-900'>
							SIGN IN WITH GOOGLE
						</Text>
					</Pressable>
					<Pressable
						className='w-full flex-row justify-center rounded-xl bg-zinc-700 py-4'
						onPress={onSignUpWithEmail}
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
