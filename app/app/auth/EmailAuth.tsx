import {
	View,
	Text,
	Pressable,
	TextInput,
	KeyboardAvoidingView,
	Keyboard,
	Modal,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, XIcon } from 'src/icons/outline';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { useSignIn } from '@clerk/clerk-expo';
import { page } from 'src/constants/routes/app';

const EmailAuth = () => {
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();

	const passwordInputRef = useRef<TextInput>(null);

	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const closeKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleSignIn = async () => {
		if (!isLoaded) return;

		try {
			const { createdSessionId } = await signIn.create({
				identifier: email,
				password,
			});

			await setActive({ session: createdSessionId });
			router.push(page.home.diary);
		} catch (err: any) {
			console.log(JSON.stringify(err));
		}

	}

	return (
		<SafeAreaView className='h-full w-full bg-zinc-900'>
			<KeyboardAvoidingView behavior='padding' className='flex-1'>
				<Pressable
					className='h-full flex-col items-center justify-between p-4'
					onPress={closeKeyboard}
				>
					<View className='w-full flex-row items-center justify-between'>
						<Pressable onPress={() => router.back()}>
							<ChevronLeftIcon
								svgClassName='w-5 h-5 text-white'
								strokeWidth={3}
							/>
						</Pressable>
						<Text className='text-3xl font-bold text-white'>
							Log in
						</Text>
						<View className='h-6 w-6' />
					</View>
					<View className='w-full flex-col items-center gap-y-6'>
						<View className='w-full flex-col'>
							<Text className='font-bold text-white'>Email</Text>
							<TextInput
								className='border-b-2 border-zinc-700 py-2 text-2xl text-white'
								autoFocus={true}
								keyboardType='email-address'
								autoCapitalize='none'
								autoComplete='email'
								clearButtonMode='while-editing'
								enablesReturnKeyAutomatically
								returnKeyType='next'
								textContentType='emailAddress'
								onSubmitEditing={() =>
									passwordInputRef.current?.focus()
								}
								blurOnSubmit={false}
								value={email}
								onChangeText={setEmail}
							/>
						</View>
						<View className='w-full flex-col'>
							<Text className='font-bold text-white'>
								Password
							</Text>
							<TextInput
								className='border-b-2 border-zinc-700 py-2 text-2xl text-white'
								ref={passwordInputRef}
								autoCapitalize='none'
								secureTextEntry
								clearButtonMode='while-editing'
								autoComplete='password'
								textContentType='password'
								enablesReturnKeyAutomatically
								returnKeyType='done'
								onSubmitEditing={handleSignIn}
								value={password}
								onChangeText={setPassword}
							/>
						</View>
						<Pressable onPress={() => setOpen(true)}>
							<Text className='mt-6 text-base font-bold text-white'>
								FORGOT YOUR PASSWORD?
							</Text>
						</Pressable>
					</View>
					<Pressable className='w-full flex-row justify-center rounded-xl bg-zinc-100 py-4'
						onPress={handleSignIn}
					>
						<Text className='text-base font-bold text-zinc-900'>
							LOG IN
						</Text>
					</Pressable>
				</Pressable>
			</KeyboardAvoidingView>
			<Modal animationType='fade' transparent={true} visible={open}>
				<KeyboardAvoidingView
					behavior='padding'
					className='w-full flex-1'
				>
					<BlurView
						intensity={50}
						tint='light'
						className='flex-1 flex-col items-center justify-center px-8'
					>
						<View className='w-full flex-col justify-between rounded-lg bg-zinc-900 px-4 py-3'>
							<Pressable
								className='flex-row justify-end'
								onPress={() => setOpen(false)}
							>
								<XIcon
									svgClassName='w-6 h-6 text-white'
									strokeWidth={3}
								/>
							</Pressable>
							<Text className='mt-2 text-base font-medium text-white'>
								Please enter your email address.{'\n'}We will
								send you a link to reset your password.
							</Text>
							<TextInput
								className='my-4 border-b-2 border-zinc-700 py-2 text-xl text-white'
								autoFocus
								keyboardType='email-address'
								autoCapitalize='none'
								autoComplete='email'
								clearButtonMode='while-editing'
								enablesReturnKeyAutomatically
								returnKeyType='go'
								placeholder='Email'
							/>
							<Pressable className='my-4 w-full flex-row justify-center rounded-xl bg-zinc-100 py-4'>
								<Text className='text-base font-bold text-zinc-900'>
									RESET PASSWORD
								</Text>
							</Pressable>
						</View>
					</BlurView>
				</KeyboardAvoidingView>
			</Modal>
		</SafeAreaView>
	);
};

export default EmailAuth;
