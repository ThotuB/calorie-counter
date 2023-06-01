import { View, Text, TextInput, TextInputProps } from 'react-native';
import React from 'react';

const AuthTextInput: React.FC<
	TextInputProps & {
		title: string;
		ref?: React.Ref<TextInput>;
	}
> = ({
	title,
	ref,
	autoFocus,
	autoCapitalize,
	clearButtonMode,
	enablesReturnKeyAutomatically,
	returnKeyType,
	onSubmitEditing,
	blurOnSubmit,
}) => {
	return (
		<View className='w-full flex-col'>
			<Text className='text-white'>{title}</Text>
			<TextInput
				className='border-b-2 border-zinc-700 py-2 text-xl text-white'
				ref={ref}
				autoFocus={autoFocus}
				autoCapitalize={autoCapitalize}
				clearButtonMode={clearButtonMode}
				enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
				returnKeyType={returnKeyType}
				onSubmitEditing={onSubmitEditing}
				blurOnSubmit={blurOnSubmit}
			/>
		</View>
	);
};

export default AuthTextInput;
