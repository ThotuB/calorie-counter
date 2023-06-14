import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
	Keyboard,
	Pressable,
	SafeAreaView,
	Text,
	TextInput,
	View,
} from 'react-native';
import SearchHome from 'src/components/food/search/SearchHome';
import SearchResults from 'src/components/food/search/SearchResults';
import { DotsHorizontalIcon, QrIcon, XIcon } from 'src/icons/outline';

const SearchFood: React.FC = () => {
	const router = useRouter();

	const [searchFocus, setSearchFocus] = useState(false);
	const [searchText, setSearchText] = useState('');

	const calories = 1000;
	const goal = 2000;

	const onCancel = () => {
		setSearchText('');
		setSearchFocus(false);
		Keyboard.dismiss();
	};

	const showSearchResults = searchFocus || searchText !== '';

	return (
		<>
			<Stack.Screen
				options={{
					animation: 'slide_from_bottom',
				}}
			/>

			<View className='h-full w-full flex-col bg-zinc-900'>
				<SafeAreaView className='sticky w-full bg-zinc-800'>
					<View className='flex-col gap-y-4 px-4'>
						<View className='w-full flex-row items-center justify-between'>
							<Pressable onPress={() => router.back()}>
								<XIcon svgClassName='w-6 h-6 text-white' />
							</Pressable>
							<Text className='font-bold text-white'>
								Add Food
							</Text>
							<DotsHorizontalIcon svgClassName='w-6 h-6 text-white' />
						</View>
						<View className='mb-6 w-full flex-row items-center justify-between'>
							<TextInput
								className='h-8 flex-1 rounded-full bg-zinc-900 px-10 text-white'
								placeholder='Food, meal or brand'
								placeholderTextColor={'#9CA3AF'}
								onFocus={() => setSearchFocus(true)}
								onBlur={() => setSearchFocus(false)}
								onChangeText={setSearchText}
								value={searchText}
							/>
							<View className=''>
								{showSearchResults ? (
									<Pressable
										className='ml-3'
										onPress={onCancel}
									>
										<Text className='text-white'>
											Cancel
										</Text>
									</Pressable>
								) : (
									<QrIcon svgClassName='ml-6 w-8 h-8 text-white' />
								)}
							</View>
						</View>
					</View>
				</SafeAreaView>
				{showSearchResults ? (
					<SearchResults searchTerm={searchText} />
				) : (
					<SearchHome calories={calories} goal={goal} />
				)}
			</View>
		</>
	);
};

export default SearchFood;
