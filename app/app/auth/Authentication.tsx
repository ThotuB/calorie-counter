import { View, Text, Pressable, Modal } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { page } from 'src/constants/routes/app';
import TermsOfService from 'src/components/auth/TermsOfService';

const Authentication = () => {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);

	const handleSignInWithApple = () => { };

	const handleSignInWithGoogle = () => { };

	const handleSignInWithEmail = () => {
		setOpen(false);
		router.push(page.auth.email_auth);
	};

	return (
		<SafeAreaView className='h-full w-full bg-purple-300'>
			<View className='h-full flex-col items-center justify-between'>
				<Text className='py-10 text-6xl font-bold'>Title</Text>
				<View className='w-full flex-col items-center gap-y-4 px-6 py-4'>
					<Pressable
						className='w-full flex-row justify-center rounded-xl bg-zinc-900 py-4'
						onPress={() =>
							router.push(page.auth.accout_setup.weight_goal)
						}
					>
						<Text className='text-base font-bold text-white'>
							GET STARTED
						</Text>
					</Pressable>
					<View className='flex-row gap-x-1'>
						<Text className='text-base font-bold text-white'>
							Already have an account?
						</Text>
						<Pressable onPress={() => setOpen(true)}>
							<Text className='text-base font-bold text-purple-800'>
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
							className='w-full flex-row justify-center rounded-xl bg-zinc-100 py-4'
							onPress={handleSignInWithEmail}
						>
							<Text className='text-base font-bold text-zinc-900'>
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
	);
};

export default Authentication;
