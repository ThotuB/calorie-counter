import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import CreateAccountLayout from 'src/layouts/CreateAccountLayout';
import { page } from 'src/constants/routes/app';
import NextButton from 'src/components/auth/NextButton';
import { useSetup } from 'src/contexts/SetupContext';

const GenderSelection = () => {
	const { gender, setGender } = useSetup();

	return (
		<View className='w-full flex-1 flex-col justify-between'>
			<View className='py-8 flex-row justify-center'>
				<Text className='text-2xl font-bold text-white'>
					What is your sex?
				</Text>
			</View>
			<View className='flex-1 w-full flex-col'>
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
				href={page.auth.sign_up.account_setup.age_selection}
				isPressable={gender !== ''}
			/>
		</View>
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
			className={`my-2 flex-row justify-center rounded-xl py-8 ${selected ? 'bg-green-300' : 'bg-zinc-700'
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

export default GenderSelection;
