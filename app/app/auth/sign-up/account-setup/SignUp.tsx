import { View, Text, Pressable } from 'react-native';
import React, { useCallback } from 'react';
import CreateAccountLayout from 'src/layouts/CreateAccountLayout';
import { useRouter } from 'expo-router';
import { page } from 'src/constants/routes/app';
import TermsOfService from 'src/components/auth/TermsOfService';
import { useSetup } from 'src/contexts/SetupContext';
import { AppleIcon, GoogleIcon } from 'src/icons/social';
import AnimatedLottieView from 'lottie-react-native';

const SignUp = () => {
	const router = useRouter();
	const { createAccountWithApple, createAccountWithGoogle } = useSetup();

	const handleSignUpWithApple = () => {
		createAccountWithApple()
			.then(() => {
				router.push(page.home.diary);
			})
	}

	const handleSignUpWithGoogle = () => {
		createAccountWithGoogle()
			.then(() => {
				router.push(page.home.diary);
			})
	}


	const onSignUpWithEmail = () => {
		router.push(page.auth.sign_up.email_sign_up);
	};

	return (
		<View className='w-full flex-1 flex-col justify-between'>
			<View className='py-8 flex-row justify-center'>
				<Text className='text-2xl font-bold text-white'>
					Let's get started!
				</Text>
			</View>
			<View className='flex-1 flex-col justify-end'>
				<View className='flex-1 flex-col justify-center items-center'>
					<AnimatedLottieView
						style={{ width: 400, height: 400 }}
						source={require('assets/lottie/broc.json')}
						autoPlay
						loop
					/>
				</View>
				<View className='flex-col gap-y-4'>
					<Pressable className='w-full flex-row justify-center items-center rounded-xl bg-zinc-100 py-4'
						onPress={handleSignUpWithApple}
					>
						<AppleIcon svgClassName='w-6 h-6 text-black' />
						<Text className='ml-3 text-base font-bold text-zinc-900'>
							SIGN IN WITH APPLE{' '}
						</Text>
					</Pressable>
					<Pressable className='w-full flex-row justify-center items-center rounded-xl bg-zinc-100 py-4'
						onPress={handleSignUpWithGoogle}
					>
						<GoogleIcon svgClassName='w-5 h-5' />
						<Text className='ml-3 text-base font-bold text-zinc-900'>
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
		</View>
	);
};

export default SignUp;
