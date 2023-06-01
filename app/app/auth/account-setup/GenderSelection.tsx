import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import CreateAccountLayout from 'src/layouts/CreateAccountLayout';
import { page } from 'src/constants/routes/app';
import NextButton from 'src/components/auth/NextButton';

const GenderSelection = () => {
	const [gender, setGender] = useState<'' | 'female' | 'male'>('');

	return (
		<CreateAccountLayout progress={2} question='What is your sex?'>
			<View className='w-full flex-1 flex-col justify-between'>
				<View className='flex w-full flex-col'>
					<Selectable
						text='Female'
						selected={gender === 'female'}
						option='female'
						onSelect={(o) => setGender(o)}
					/>
					<Selectable
						text='Male'
						selected={gender === 'male'}
						option='male'
						onSelect={(o) => setGender(o)}
					/>
				</View>
				<NextButton
					href={page.auth.accout_setup.height_selection}
					isPressable={gender !== ''}
				/>
			</View>
		</CreateAccountLayout>
	);
};

const Selectable: React.FC<{
	text: string;
	selected: boolean;
	option: '' | 'female' | 'male';
	onSelect: (option: '' | 'female' | 'male') => void;
}> = ({ text, selected, option, onSelect }) => {
	const handlePress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		selected ? onSelect('') : onSelect(option);
	};

	return (
		<Pressable
			className={`my-2 flex-row justify-center rounded-xl py-8 ${
				selected ? 'bg-purple-300' : 'bg-zinc-700'
			}`}
			onPress={handlePress}
		>
			<Text
				className={`text-2xl font-bold ${
					selected ? 'text-white' : 'text-zinc-500'
				}`}
			>
				{text}
			</Text>
		</Pressable>
	);
};

export default GenderSelection;
