import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { useRouter } from 'expo-router';

const NextButton: React.FC<{
	href: string;
	isPressable?: boolean;
}> = ({ href, isPressable = true }) => {
	const router = useRouter();

	const onPress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		router.push(href);
	};

	return (
		<Pressable
			className={`w-full py-4 ${isPressable ? 'bg-purple-400' : 'bg-zinc-700'
				} mb-6 flex flex-row justify-center rounded-md`}
			onPress={onPress}
			disabled={!isPressable}
		>
			<Text
				className={`font-bold ${isPressable ? 'text-white' : 'text-zinc-500'
					}`}
			>
				NEXT
			</Text>
		</Pressable>
	);
};

export default NextButton;
