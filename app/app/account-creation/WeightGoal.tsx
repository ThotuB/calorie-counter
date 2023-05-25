import { Pressable, View, Text } from 'react-native';
import CreateAccountLayout from 'src/layouts/CreateAccountLayout';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';

const WeightGoal = () => {
	const [weightGoal, setWeightGoal] = useState<
		'' | 'lose' | 'maintain' | 'gain'
	>('');

	return (
		<CreateAccountLayout
			progress={1}
			question='What is your weight goal?'
			href='/WeightGoal'
			isPressable={weightGoal !== ''}
		>
			<View className='flex w-full flex-col'>
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
			className={`my-2 flex-row justify-center rounded-xl py-8 ${
				selected ? 'bg-purple-300' : 'bg-gray-700'
			}`}
			onPress={handlePress}
		>
			<Text
				className={`text-2xl font-bold ${
					selected ? 'text-white' : 'text-gray-500'
				}`}
			>
				{text}
			</Text>
		</Pressable>
	);
};

export default WeightGoal;
