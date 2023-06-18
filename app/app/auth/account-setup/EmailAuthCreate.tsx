import {
	View,
	Text,
	Pressable,
	KeyboardAvoidingView,
	Keyboard,
	TextInput,
	Modal,
} from 'react-native';
import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, XIcon } from 'src/icons/outline';
import { Stack, useRouter } from 'expo-router';
import TermsOfService from 'src/components/auth/TermsOfService';
import AuthTextInput from 'src/components/auth/AuthTextInput';
import { useSignUp } from '@clerk/clerk-expo';
import { page } from 'src/constants/routes/app';
import * as Haptics from 'expo-haptics';

const EmailAuthCreate = () => {
	const { isLoaded, signUp, setActive } = useSignUp();

	const router = useRouter();
	const emailInputRef = useRef<TextInput>(null);
	const passwordInputRef = useRef<TextInput>(null);

	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [code, setCode] = useState('');
	const [modalVisible, setModalVisible] = useState(false);

	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [codeError, setCodeError] = useState(false);

	useEffect(() => {
		if (code.length === 6) {
			handleVerifyEmail();
		}
	}, [code]);

	const closeKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleCloseModal = () => {
		setModalVisible(false);
		setCode('');
		setCodeError(false);
	}

	const handleSignUp = async () => {
		if (!isLoaded) return;

		try {
			await signUp.create({
				username: displayName,
				emailAddress: email,
				password: password,
			})

			await signUp.prepareEmailAddressVerification()
			setModalVisible(true);
		}
		catch (err: any) {
			console.log(JSON.stringify(err, null, 2));
			err?.errors?.map((error: any) => {
				if (error?.meta?.paramName === 'email_address') {
					setEmailError(error.message);
				}
				else if (error.meta?.paramName === 'password') {
					setPasswordError(error.message);
				}
			})
		}
	}

	const handleVerifyEmail = async () => {
		if (!isLoaded) return;

		try {
			console.log('code', code);
			const { createdSessionId } = await signUp.attemptEmailAddressVerification({
				code: code,
			})

			await setActive({ session: createdSessionId })
			router.push(page.home.diary);
		}
		catch (err: any) {
			console.log(JSON.stringify(err, null, 2));
			setCodeError(true);
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
		}
	}

	return (
		<>
			<Stack.Screen
				options={{
					animation: 'slide_from_right',
				}}
			/>

			<Modal visible={modalVisible} animationType='slide' transparent>
				<KeyboardAvoidingView behavior='padding' className='h-full w-full bg-black/75 flex-row justify-center items-center'>
					<View className='w-4/5 bg-zinc-800 flex-col items-center rounded-2xl p-4'>
						<View className='w-full flex-row justify-between items-center'>
							<Pressable onPress={handleCloseModal}>
								<XIcon svgClassName='w-6 h-6 text-white' strokeWidth={3} />
							</Pressable>
							<Text className='text-2xl font-bold text-white'>
								Verify Email
							</Text>
							<View className='h-6 w-6' />
						</View>
						<CodeVerification
							code={code}
							setCode={setCode}
							error={codeError}
						/>
						<Pressable
							className='w-full mt-6 flex-row justify-center items-center p-2 rounded-lg bg-purple-400'
							onPress={handleVerifyEmail}
						>
							<Text className='text-white text-base font-semibold'>
								VERIFY
							</Text>
						</Pressable>
					</View>
				</KeyboardAvoidingView>
			</Modal>

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
									value={displayName}
									onChangeText={setDisplayName}
								/>
							</View>
							<View className='w-full'>
								<AuthTextInput
									title='Email'
									error={emailError !== ''}
									innerRef={emailInputRef}
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
							<View className='w-full'>
								<AuthTextInput
									title='Password'
									error={passwordError !== ''}
									innerRef={passwordInputRef}
									autoCapitalize='none'
									secureTextEntry
									clearButtonMode='while-editing'
									autoComplete='password'
									textContentType='password'
									enablesReturnKeyAutomatically
									returnKeyType='done'
									onSubmitEditing={closeKeyboard}
									value={password}
									onChangeText={setPassword}
								/>
							</View>

							<TermsOfService />
						</View>
						<Pressable className='w-full flex-row justify-center rounded-xl bg-zinc-100 py-4'
							onPress={handleSignUp}
						>
							<Text className='text-base font-bold text-zinc-900'>
								CREATE ACCOUNT
							</Text>
						</Pressable>
					</Pressable>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</>
	);
};

const CodeVerification: React.FC<{
	code: string;
	setCode: Dispatch<SetStateAction<string>>;
	error: boolean;
}> = ({ code, setCode, error }) => {
	const codeRefs = [
		useRef<TextInput>(null),
		useRef<TextInput>(null),
		useRef<TextInput>(null),
		useRef<TextInput>(null),
		useRef<TextInput>(null),
		useRef<TextInput>(null),
	];

	return (
		<View className='flex-row w-full justify-around items-center my-4'>
			{codeRefs.map((_, index) => (
				<CodeInput
					key={index}
					refs={codeRefs}
					index={index}
					code={code}
					setCode={setCode}
					error={error}
				/>
			))}
		</View>
	);
}

const CodeInput: React.FC<{
	refs: RefObject<TextInput>[];
	index: number;
	code: string;
	setCode: Dispatch<SetStateAction<string>>;
	error: boolean;
}> = ({ refs, index, code, setCode, error }) => {
	const onChangeCode = (letter: number, text: string) => {
		setCode((prev) => {
			let newCode = prev.split('');
			newCode[letter] = text;
			return newCode.join('');
		})

		if (text !== '') {
			if (letter < refs.length - 1) {
				refs[letter + 1].current?.focus();
			}
			else {
				Keyboard.dismiss();
			}
		}
		else {
			if (letter > 0) {
				refs[letter - 1].current?.focus();
			}
		}
	}

	return (
		<TextInput
			className={`w-10 h-10 pb-1 rounded-xl bg-zinc-100 border-4 ${error ? 'border-red-500' : 'border-zinc-100'} text-center text-2xl font-bold text-zinc-900 focus:border-purple-400`}
			ref={refs[index]}
			autoFocus={index === 0}
			maxLength={1}
			autoComplete='off'
			keyboardType='number-pad'
			enablesReturnKeyAutomatically
			selectTextOnFocus
			caretHidden
			returnKeyType='next'
			blurOnSubmit={false}
			onChangeText={(text) => onChangeCode(index, text)}
			value={code[index]}
		/>
	)
}

export default EmailAuthCreate;
