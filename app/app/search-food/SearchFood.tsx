import {
	View,
	Text,
	TextInput,
	SafeAreaView,
	ScrollView,
	Pressable,
	Keyboard,
} from 'react-native';
import { useState } from 'react';
import SearchResults from './SearchResults';
import { XIcon, DotsHorizontalIcon, QrIcon } from 'src/icons/outline';

const SearchFood: React.FC = () => {
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
		<View className='h-full w-full flex-col bg-zinc-900'>
			<SafeAreaView className='sticky w-full bg-zinc-700'>
				<View className='flex-col gap-y-4 px-4'>
					<View className='w-full flex-row justify-between'>
						<XIcon svgClassName='w-6 h-6 text-white' />
						<Text className='font-bold text-white'>Add Food</Text>
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
								<Pressable className='ml-3' onPress={onCancel}>
									<Text className='text-white'>Cancel</Text>
								</Pressable>
							) : (
								<QrIcon svgClassName='ml-6 w-8 h-8 text-white' />
							)}
						</View>
					</View>
				</View>
			</SafeAreaView>
			{showSearchResults ? (
				// Search results
				<SearchResults searchTerm={searchText} />
			) : (
				// Daily intake
				<ScrollView className='h-full flex-1 bg-zinc-900 p-4'>
					<View className='flex-col rounded-xl bg-zinc-700 px-4 py-5'>
						<View className='flex-col gap-y-1'>
							<View className='flex-row justify-between'>
								<Text className='font-bold text-white'>
									Daily Intake
								</Text>
								<Text className='text-white'>
									{calories} / {goal} kcal
								</Text>
							</View>
							<View className='h-1.5 flex-row overflow-hidden rounded-3xl bg-zinc-900'>
								<View
									className='h-full bg-green-300'
									style={{
										width: `${(calories / goal) * 100}%`,
									}}
								/>
							</View>
						</View>
						<View className='mt-4 flex-row justify-between'>
							<Macro
								barClassName='bg-orange-300'
								name='Carbs'
								value={30}
								goal={321}
							/>
							<Macro
								barClassName='bg-pink-300'
								name='Protein'
								value={54}
								goal={128}
							/>
							<Macro
								barClassName='bg-purple-300'
								name='Fat'
								value={78}
								goal={86}
							/>
						</View>
					</View>
				</ScrollView>
			)}
		</View>
	);
};

const Macro: React.FC<{
	barClassName: string;
	name: string;
	value: number;
	goal: number;
}> = ({ barClassName, name, value, goal }) => (
	<View className='flex-col items-center gap-y-2'>
		<Text className='text-xs text-white'>{name}</Text>
		<View className='h-1.5 w-20 flex-row overflow-hidden rounded-3xl bg-zinc-900'>
			<View
				className={'h-full ' + barClassName}
				style={{
					width: `${(value / goal) * 100}%`,
				}}
			/>
		</View>
		<Text className='text-xs text-white'>
			{value} / {goal}g
		</Text>
	</View>
);

export default SearchFood;
