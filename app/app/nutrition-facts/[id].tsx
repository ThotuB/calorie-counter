import {
	SafeAreaView,
	View,
	Text,
	ScrollView,
	TextInput,
	Pressable,
} from 'react-native';
import { useState } from 'react';
import FoodRating from 'src/components/food/nutrition/FoodRating';
import { ChevronLeftIcon, ChevronRightIcon } from 'src/icons/outline';
import { HeartIcon } from 'src/icons/solid';
import { Food, Nutrients, Vitamins, Minerals, Aminos } from 'src/types/food';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getFoodById } from 'src/services/usda-food';
import NutritionalFacts from 'src/components/food/nutrition/NutritionalFacts';

const NutritionFacts: React.FC<{}> = () => {
	const router = useRouter();
	const { id, name } = useLocalSearchParams();

	const { data: food, isLoading } = useQuery(['food', id], () =>
		getFoodById(id as string),
	);

	const [nrOfServings, setNrOfServings] = useState('1');
	const [servingSize, setServingSize] = useState(`100 g`);

	return (
		<View className='h-full w-full flex-col bg-zinc-900'>
			<SafeAreaView className='sticky w-full bg-zinc-700'>
				<View className='w-full flex-row items-center justify-between px-3 py-2'>
					<Pressable onPress={() => router.back()}>
						<ChevronLeftIcon svgClassName='w-6 h-6 text-white' />
					</Pressable>
					<Text className='text-base font-bold text-white'>
						{name}
					</Text>
					<HeartIcon svgClassName='w-6 h-6 text-white' />
				</View>
			</SafeAreaView>
			<ScrollView className='flex-1'>
				{food && !isLoading && (
					<View className='flex-1 flex-col px-3 py-3'>
						<View className='mb-5 flex-row gap-x-3'>
							<View className='h-14 w-14 flex-row items-center justify-center rounded-lg bg-zinc-700'>
								<TextInput
									className='text-base font-bold text-white'
									value={nrOfServings}
									onChangeText={setNrOfServings}
									keyboardType='numeric'
									selectTextOnFocus={true}
								/>
							</View>
							<Pressable className='h-14 flex-1 flex-row items-center rounded-lg bg-zinc-700 px-4'>
								<Text className='flex-1 flex-row items-center justify-center text-base font-bold text-white'>
									{servingSize}
								</Text>
								<ChevronRightIcon
									svgClassName='w-4 h-4 text-white'
									strokeWidth={4}
								/>
							</Pressable>
						</View>

						<FoodRating
							calories={food.calories}
							nutrients={food.nutrients}
							vitamins={food.vitamins}
							minerals={food.minerals}
							aminos={food.aminos}
						/>

						<NutritionalFacts food={food} />
					</View>
				)}
			</ScrollView>
		</View>
	);
};

export default NutritionFacts;
