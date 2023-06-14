import {
	SafeAreaView,
	View,
	Text,
	ScrollView,
	TextInput,
	Pressable,
	Modal,
} from 'react-native';
import { useState } from 'react';
import FoodRating from 'src/components/food/nutrition/FoodRating';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'src/icons/outline';
import { HeartIcon } from 'src/icons/outline';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getFoodById } from 'src/services/usda-food';
import NutritionalFacts from 'src/components/food/nutrition/NutritionalFacts';
import { addFavoriteFood } from 'src/services/favorite-food';
import { addMeal } from 'src/services/meal';
import { dateToYYYYMMDD } from 'src/utils/date';

const NutritionFacts: React.FC<{}> = () => {
	const router = useRouter();
	const { id, name } = useLocalSearchParams();

	const { data: food, isLoading } = useQuery(['food', id], () =>
		getFoodById(id as string),
	);

	const [nrOfServings, setNrOfServings] = useState('1');
	const [servingSize, setServingSize] = useState<'grams' | '100 grams' | 'serving'>(`grams`);
	const [modalVisible, setModalVisible] = useState(false);

	const onPressHeart = async () => {
		await addFavoriteFood(12, parseInt(id as string));
	}

	const onPressTrack = async () => {
		let portions = parseInt(nrOfServings);
		if (servingSize === '100 grams') {
			portions = portions * 100;
		}

		let portionSize = ({
			'grams': 'gram',
			'100 grams': 'gram',
			'serving': 'serving',
		} as const)[servingSize];

		await addMeal({
			user_id: 12,
			food_id: parseInt(id as string),
			meal_type: 'breakfast',
			portions: portions,
			portion_size: portionSize,
			date: dateToYYYYMMDD(new Date()),
		})
	}

	return (
		<View className='h-full w-full flex-col bg-zinc-900'>
			<SafeAreaView className='sticky w-full bg-zinc-800'>
				<View className='w-full flex-row items-center justify-between px-3 py-2'>
					<Pressable onPress={() => router.back()}>
						<ChevronLeftIcon svgClassName='w-6 h-6 text-white' />
					</Pressable>
					<Text className='text-base font-bold text-white'>
						{name}
					</Text>
					<Pressable
						onPress={onPressHeart}
					>
						<HeartIcon svgClassName='w-6 h-6 text-white' />
					</Pressable>
				</View>
			</SafeAreaView>
			<SafeAreaView className='flex-1'>
				<ScrollView className='flex-1'>
					{food && (
						<View className='flex-1 flex-col px-4 py-3'>
							<View className='mb-5 flex-row gap-x-3'>
								<View className='h-14 w-14 flex-row items-center justify-center rounded-lg bg-zinc-800'>
									<TextInput
										className='text-base font-bold text-white'
										value={nrOfServings}
										onChangeText={setNrOfServings}
										keyboardType='numeric'
										selectTextOnFocus={true}
									/>
								</View>
								<Pressable className='h-14 flex-1 flex-row items-center rounded-lg bg-zinc-800 px-4'
									onPress={() => setModalVisible(true)}
								>
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

							<View className='mt-6 mb-4 w-full flex-row justify-center'>
								<Text className='font-bold text-zinc-300'>
									#{food.id} USDA FoodData Central
								</Text>
							</View>
							<Modal visible={modalVisible}
								animationType='slide'
								transparent={true}

							>
								<Pressable
									className='h-full w-full bg-zinc-900 opacity-60'
									onPress={() => setModalVisible(false)}
								/>
								<View className='absolute bottom-0 w-full flex-col items-center justify-between rounded-t-3xl bg-zinc-800 py-6 px-6'>
									<View className='w-full flex-row items-center justify-between'>
										<Pressable
											className='w-10'
											onPress={() => setModalVisible(false)}
										>
											<XIcon svgClassName='w-6 h-6 text-white' strokeWidth={3} />
										</Pressable>
										<Text className='text-lg font-bold text-white'>
											HOW MUCH?
										</Text>
										<Pressable
											className='w-10'
											onPress={() => setModalVisible(false)}
										>
											<Text className='text-base text-emerald-500'>
												Done
											</Text>
										</Pressable>
									</View>
								</View>
							</Modal>
						</View>
					)}
				</ScrollView>

				<View className='w-full flex-row items-center justify-center px-4'>
					<Pressable
						className='w-full bg-emerald-500 flex-row justify-center py-4 rounded-lg'
						style={{
							shadowColor: 'rgb(24 24 27)',
							shadowOffset: {
								width: 0,
								height: -15,
							},
							shadowOpacity: 1,
							shadowRadius: 10,
						}}
						onPress={onPressTrack}
					>
						<Text className='text-base font-bold text-zinc-900'>
							TRACK
						</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default NutritionFacts;
