import {
	View,
	Text,
	Pressable,
	KeyboardAvoidingView,
	Keyboard,
	TextInput,
} from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'src/icons/outline';
import { useRouter } from 'expo-router';
import TermsOfService from 'src/components/auth/TermsOfService';
import AuthTextInput from 'src/components/auth/AuthTextInput';

const EmailAuthCreate = () => {
	const router = useRouter();
	const emailInputRef = useRef<TextInput>(null);
	const passwordInputRef = useRef<TextInput>(null);

	const closeKeyboard = () => {
		Keyboard.dismiss();
	};

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
							Create Account
						</Text>
						<View className='h-6 w-6' />
					</View>
					<View className='w-full flex-col items-center gap-y-4'>
						<View className='w-full'>
							<AuthTextInput
								className='border-b-2 border-zinc-700 py-2 text-xl text-white'
								title='Display Name'
								autoComplete='off'
								autoFocus={true}
								autoCapitalize='words'
								clearButtonMode='while-editing'
								enablesReturnKeyAutomatically
								returnKeyType='next'
								onSubmitEditing={() =>
									emailInputRef.current?.focus()
								}
								blurOnSubmit={false}
							/>
						</View>
						<View className='w-full'>
							<AuthTextInput
								className='border-b-2 border-zinc-700 py-2 text-xl text-white'
								title='Email'
								ref={emailInputRef}
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
							/>
						</View>
						<View className='w-full'>
							<AuthTextInput
								className='border-b-2 border-zinc-700 py-2 text-xl text-white'
								title='Password'
								ref={passwordInputRef}
								autoCapitalize='none'
								secureTextEntry
								clearButtonMode='while-editing'
								autoComplete='password'
								textContentType='password'
								enablesReturnKeyAutomatically
							/>
						</View>

						<TermsOfService />
					</View>
					<Pressable className='w-full flex-row justify-center rounded-xl bg-zinc-100 py-4'>
						<Text className='text-base font-bold text-zinc-900'>
							CREATE ACCOUNT
						</Text>
					</Pressable>
				</Pressable>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default EmailAuthCreate;
