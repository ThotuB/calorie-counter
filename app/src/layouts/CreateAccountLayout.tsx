import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

const CreateAccountLayout: React.FC<{
	children: React.ReactNode;
	question: string;
	progress: number;
	href: string;
	isPressable?: boolean;
}> = ({ children, question, progress, href, isPressable = true }) => {
	const totalSteps = 5;

	const onPress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
	};

	return (
		<View className='bg-gray-900'>
			<StatusBar style='light' />
			<SafeAreaView className='h-full w-full '>
				<View className='flex flex-1 flex-col items-center px-4'>
					<View className='flex flex-row items-center justify-between py-4'>
						<View className='w-24' />
						<View className='flex flex-row gap-2'>
							{Array.from({ length: progress }).map((_, i) => (
								<View
									key={i}
									className=' h-1 flex-1 rounded-full bg-purple-400'
								/>
							))}
							{Array.from({ length: totalSteps - progress }).map(
								(_, i) => (
									<View
										key={totalSteps - i}
										className=' h-1 flex-1 rounded-full bg-gray-600'
									/>
								),
							)}
						</View>
						<View className='w-24' />
					</View>
					<View className='w-full flex-1 flex-col items-center'>
						<View className='py-8'>
							<Text className='text-2xl font-bold text-white'>
								{question}
							</Text>
						</View>
						{children}
					</View>
					<Pressable
						className={`w-full py-4 ${
							isPressable ? 'bg-purple-400' : 'bg-gray-700'
						} mb-6 flex flex-row justify-center rounded-md`}
						onPress={onPress}
					>
						<Text
							className={`font-bold ${
								isPressable ? 'text-white' : 'text-gray-500'
							}`}
						>
							NEXT
						</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default CreateAccountLayout;
