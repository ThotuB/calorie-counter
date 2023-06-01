import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeftIcon } from 'src/icons/outline';

const CreateAccountLayout: React.FC<{
	children: React.ReactNode;
	question: string;
	progress: number;
}> = ({ children, question, progress }) => {
	const router = useRouter();
	const totalSteps = 5;

	return (
		<View className='bg-zinc-900'>
			<StatusBar style='light' />
			<SafeAreaView className='h-full w-full '>
				<View className='flex-1 flex-col items-center justify-between px-4'>
					<View className='flex-row items-center justify-between py-4'>
						<Pressable
							className='mr-8'
							onPress={() => router.back()}
						>
							<ChevronLeftIcon
								svgClassName='h-5 w-5 text-white'
								strokeWidth={3}
							/>
						</Pressable>
						<View className='flex-1 flex-row'>
							{Array.from({ length: progress }).map((_, i) => (
								<View
									key={i}
									className=' mx-1 h-1 flex-1 rounded-full bg-purple-400'
								/>
							))}
							{Array.from({ length: totalSteps - progress }).map(
								(_, i) => (
									<View
										key={totalSteps - i}
										className=' mx-1 h-1 flex-1 rounded-full bg-zinc-600'
									/>
								),
							)}
						</View>
						<View className='ml-8 w-5' />
					</View>
					<View className='w-full flex-1 flex-col items-center'>
						<View className='py-8'>
							<Text className='text-2xl font-bold text-white'>
								{question}
							</Text>
						</View>
						{children}
					</View>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default CreateAccountLayout;
