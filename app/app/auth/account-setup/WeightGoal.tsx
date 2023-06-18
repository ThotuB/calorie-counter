import { Pressable, View, Text } from 'react-native';
import CreateAccountLayout from 'src/layouts/CreateAccountLayout';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { page } from 'src/constants/routes/app';
import NextButton from 'src/components/auth/NextButton';
import { useSetup } from 'src/contexts/SetupContext';

const WeightGoal = () => {
	const { weightGoal, setWeightGoal } = useSetup();

	return (
		<CreateAccountLayout progress={1} question='What is your weight goal?'>
			<View className='w-full flex-1 flex-col justify-between'>
				<View className='w-full flex-col'>
					<Selectable
						text='Lose weight'
						selected={weightGoal === 'lose'}
						onPress={() => setWeightGoal('lose')}
					/>
					<Selectable
						text='Maintain weight'
						selected={weightGoal === 'maintain'}
						onPress={() => setWeightGoal('maintain')}
					/>
					<Selectable
						text='Gain weight'
						selected={weightGoal === 'gain'}
						onPress={() => setWeightGoal('gain')}
					/>
				</View>
				<NextButton
					href={page.auth.accout_setup.gender_selection}
					isPressable={weightGoal !== ''}
				/>
			</View>
		</CreateAccountLayout>
	);
};

const Selectable: React.FC<{
	text: string;
	selected: boolean;
	onPress: () => void;
}> = ({ text, selected, onPress }) => {
	const handlePress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		onPress();
	};

	return (
		<Pressable
			className={`my-2 flex-row justify-center rounded-xl py-8 ${selected ? 'bg-purple-300' : 'bg-zinc-700'
				}`}
			onPress={handlePress}
		>
			<Text
				className={`text-2xl font-bold ${selected ? 'text-white' : 'text-zinc-500'
					}`}
			>
				{text}
			</Text>
		</Pressable>
	);
};

export default WeightGoal;
