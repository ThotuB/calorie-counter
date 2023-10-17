import { View, Text, Pressable, Modal, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { page } from 'src/constants/routes/app';
import TermsOfService from 'src/components/auth/TermsOfService';
import { useOAuth, useSession } from '@clerk/clerk-expo';
import { AppleIcon, GoogleIcon } from 'src/icons/social';

const Authentication = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const { startOAuthFlow: oauthFlowGoogle } = useOAuth({ strategy: 'oauth_google' })
	const { startOAuthFlow: oauthFlowApple } = useOAuth({ strategy: 'oauth_apple' })

	const onSignUpWithApple = async () => {
		try {
			const { createdSessionId, setActive } = await oauthFlowApple({});

			if (!setActive) return

			setActive({ session: createdSessionId });
			router.push(page.home.diary);
		} catch (err) {
			console.error("OAuth error", JSON.stringify(err, null, 2));
		}
	};

	const onSignUpWithGoogle = async () => {
		try {
			const { createdSessionId, setActive } = await oauthFlowGoogle({});

			if (!setActive) return

			setActive({ session: createdSessionId });
			router.push(page.home.diary);
		} catch (err) {
			console.error("OAuth error", JSON.stringify(err, null, 2));
		}
	};

	const handleSignInWithEmail = () => {
		setOpen(false);
		router.push(page.auth.email_sign_in);
	};

	return (
		<ImageBackground
			source={require('assets/gradients/gradient-4.png')}
			className='h-full w-full'
		>
			<SafeAreaView className='h-full w-full'>
				<View className='h-full flex-col items-center justify-between'>
					<View className='flex-1 flex-row items-center justify-between'>
						<Text className='text-7xl text-zinc-900 font-bold'>Calory</Text>
					</View>
					<View className='w-full flex-col items-center gap-y-4 px-6 py-4'>
						<Pressable
							className='w-full flex-row justify-center rounded-xl bg-zinc-900 py-4'
							onPress={() =>
								router.push({ pathname: page.auth.sign_up.account_setup.weight_goal })
							}
						>
							<Text className='text-base font-bold text-white'>
								GET STARTED
							</Text>
						</Pressable>
						<View className='flex-row gap-x-1'>
							<Text className='text-base font-bold text-zinc-900'>
								Already have an account?
							</Text>
							<Pressable onPress={() => setOpen(true)}>
								<Text className='text-base font-bold text-purple-700'>
									Sign in
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
				<Modal visible={open} animationType='slide' transparent>
					<Pressable
						className='h-full w-full'
						onPress={() => setOpen(false)}
					/>
					<View className='absolute bottom-0 w-full flex-col items-center justify-between rounded-t-3xl bg-zinc-800 py-6'>
						<Text className='mb-12 text-3xl font-bold text-white'>
							Log in
						</Text>
						<View className='w-full flex-col items-center gap-y-4 px-6'>
							<Pressable className='w-full flex-row justify-center items-center rounded-xl bg-zinc-100 py-4'
								onPress={onSignUpWithApple}
							>
								<AppleIcon svgClassName='w-6 h-6 text-black' />
								<Text className='ml-3 text-base font-bold text-zinc-900'>
									SIGN IN WITH APPLE{' '}
								</Text>
							</Pressable>
							<Pressable className='w-full flex-row justify-center items-center rounded-xl bg-zinc-100 py-4'
								onPress={onSignUpWithGoogle}
							>
								<GoogleIcon svgClassName='w-5 h-5' />
								<Text className='ml-3 text-base font-bold text-zinc-900'>
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
						<View className='mb-8 mt-12 px-10'>
							<TermsOfService />
						</View>
					</View>
				</Modal>
			</SafeAreaView>
		</ImageBackground>
	);
};

export default Authentication;
