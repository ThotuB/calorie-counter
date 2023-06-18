import { View, Text, TextInput, TextInputProps } from 'react-native';
import React from 'react';

const AuthTextInput: React.FC<
	TextInputProps & {
		title: string;
		innerRef?: React.Ref<TextInput>;
		error?: boolean;
	}
> = ({
	title,
	innerRef,
	keyboardType,
	error,
	autoFocus,
	autoCapitalize,
	autoComplete,
	clearButtonMode,
	enablesReturnKeyAutomatically,
	returnKeyType,
	textContentType,
	secureTextEntry,
	onSubmitEditing,
	blurOnSubmit,
	value,
	onChangeText,
}) => {
		return (
			<View className='w-full flex-col'>
				<Text className='text-white'>{title}</Text>
				<TextInput
					className={`border-b-2 ${error ? 'border-red-400' : 'border-zinc-700'} py-2 text-xl text-white`}
					ref={innerRef}
					keyboardType={keyboardType}
					autoComplete={autoComplete}
					autoFocus={autoFocus}
					autoCapitalize={autoCapitalize}
					secureTextEntry={secureTextEntry}
					clearButtonMode={clearButtonMode}
					textContentType={textContentType}
					enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
					returnKeyType={returnKeyType}
					onSubmitEditing={onSubmitEditing}
					blurOnSubmit={blurOnSubmit}
					value={value}
					onChangeText={onChangeText}
				/>
			</View>
		);
	};

export default AuthTextInput;
