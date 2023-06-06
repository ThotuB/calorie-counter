import { View, Text, Pressable, Switch } from 'react-native';
import React from 'react';
import { ChevronRightIcon } from 'src/icons/outline';

export const Section: React.FC<{
	title?: string;
	children: React.ReactNode;
}> = ({ title, children }) => {
	return (
		<View className='flex-col mb-6'>
			{title && (
				<View className='mb-2'>
					<Text className='font-bold text-zinc-300'>{title}</Text>
				</View>
			)}
			<View className='flex-col rounded-lg bg-zinc-800 px-4 py-1'>
				{children}
			</View>
		</View>
	);
};

export const SectionItemLayout: React.FC<{
	children: React.ReactNode;
	onPress?: () => void;
}> = ({ children, onPress }) => {
	return (
		<Pressable
			className='flex-row items-center justify-between py-3'
			onPress={onPress}
		>
			{children}
		</Pressable>
	);
};

export const SimpleSectionItem: React.FC<{
	leftText?: string;
	rightText?: string;
	onPress?: () => void;
}> = ({ leftText, rightText, onPress }) => {
	return (
		<SectionItemLayout onPress={onPress}>
			<Text className='text-base font-semibold text-white'>
				{leftText}
			</Text>
			<Text className='text-base font-semibold text-zinc-400'>
				{rightText}
			</Text>
		</SectionItemLayout>
	);
};

export const OnOffSectionItem: React.FC<{
	leftText: string;
	on?: boolean;
	onPress?: () => void;
}> = ({ leftText, on, onPress }) => {
	return (
		<SectionItemLayout onPress={onPress}>
			<Text className='text-base font-semibold text-white'>
				{leftText}
			</Text>
			<View className='flex-row items-center'>
				<Text className='mr-3 text-base font-semibold text-zinc-400'>
					{on ? 'On' : 'Off'}
				</Text>
				<ChevronRightIcon
					svgClassName='w-5 h-5 text-zinc-400'
					strokeWidth={2}
				/>
			</View>
		</SectionItemLayout>
	);
};

export const ToggleSectionItem: React.FC<{
	leftText: string;
	value: boolean;
	onToggle: (value: boolean) => void;
}> = ({ leftText, value, onToggle }) => {
	return (
		<SectionItemLayout>
			<Text className='text-base font-semibold text-white'>
				{leftText}
			</Text>
			<View className='flex-row items-center'>
				<Switch value={value} onValueChange={onToggle} />
			</View>
		</SectionItemLayout>
	);
}