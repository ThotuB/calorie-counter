import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
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
import { page } from 'src/constants/routes/app';
import { DotsHorizontalIcon, QrIcon, XIcon } from 'src/icons/outline';
import { MealType } from 'src/types/meal-types';

const SearchFood: React.FC = () => {
	const router = useRouter();
	const params = useLocalSearchParams<{
		mealType: MealType;
	}>();
	const mealType = params.mealType || 'snack';

	const [searchFocus, setSearchFocus] = useState(false);
	const [searchText, setSearchText] = useState('');

	const onCancel = () => {
		setSearchText('');
		setSearchFocus(false);
		Keyboard.dismiss();
	};

	const showSearchResults = searchText !== ''

	return (
		<>
			<Stack.Screen
				options={{
					animation: 'slide_from_bottom',
				}}
			/>

			<View className='h-full w-full flex-col bg-zinc-900'>
				<SafeAreaView className='sticky w-full bg-zinc-800'>
					<View className='flex-col px-4 mt-4'>
						<View className='w-full flex-row items-center justify-between'>
							<Pressable onPress={() => router.back()}>
								<XIcon svgClassName='w-6 h-6 text-white' />
							</Pressable>
							<Text className='font-bold text-white'>
								{mealType.charAt(0).toUpperCase() + mealType.slice(1)}
							</Text>
							<DotsHorizontalIcon svgClassName='w-6 h-6 text-white' />
						</View>
						<View className='mb-6 mt-4 w-full flex-row items-center justify-between'>
							<TextInput
								className='h-10 flex-1 rounded-full bg-zinc-900 px-10 text-white'
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
									<Pressable
										onPress={() => router.push({
											pathname: page.food.scan_food,
											params: {
												mealType,
											}
										})}
										hitSlop={30}
									>
										<QrIcon svgClassName='ml-6 w-8 h-8 text-white' />
									</Pressable>
								)}
							</View>
						</View>
					</View>
				</SafeAreaView>
				{showSearchResults ? (
					<SearchResults searchTerm={searchText} mealType={mealType} />
				) : (
					<SearchHome mealType={mealType} />
				)}
			</View>
		</>
	);
};

export default SearchFood;
