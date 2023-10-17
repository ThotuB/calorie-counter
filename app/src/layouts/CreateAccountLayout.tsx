import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeftIcon } from 'src/icons/outline';
import { useState } from 'react';

const questions = [
	"What is your weight goal?",
	"What is your sex?",
	"What is your age?",
	"What is your height?",
	"What is your weight?",
]

let pr = -1;

const CreateAccountLayout: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const { params } = useLocalSearchParams();
	const progress = params?.progress ? parseInt(params.progress) : 1;
	pr++;
	console.log(pr)

	const router = useRouter();
	const totalSteps = 6;

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
							{Array.from({ length: pr }).map((_, i) => (
								<View
									key={i}
									className=' mx-1 h-1 flex-1 rounded-full bg-green-400'
								/>
							))}
							{Array.from({ length: totalSteps - pr }).map(
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
						{children}
					</View>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default CreateAccountLayout;
