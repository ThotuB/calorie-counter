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
import { HeartIcon as HearIconSolid } from 'src/icons/solid';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import NutritionalFacts from 'src/components/food/nutrition/NutritionalFacts';
import { addFavoriteFood, isFavoriteFood, removeFavoriteFood } from 'src/services/favorite-food';
import { addMeal } from 'src/services/meal';
import { useAuthedUser } from 'src/contexts/UserContext';
import { CreateMeal } from 'src/types/meal-types';
import { page } from 'src/constants/routes/app';
import { useDate } from 'src/contexts/DateContext';
import { useFood } from 'src/contexts/FoodContext';

const NutritionFacts: React.FC = () => {
	const { food } = useFood();

	const router = useRouter();
	const { user } = useAuthedUser();
	const queryClient = useQueryClient();
	const { dateYMD } = useDate();

	const [isFavorite, setIsFavorite] = useState(false);
	const [nrOfServings, setNrOfServings] = useState('1');
	const [servingSize, setServingSize] = useState<'grams' | '100 grams' | 'serving'>(`serving`);
	const [modalVisible, setModalVisible] = useState(false);

	useQuery(['favorite-food', food!.id], () => isFavoriteFood(
		user.id,
		food!.id,
		food!.source
	), {
		onSuccess: (data) => {
			setIsFavorite(data);
		},
		enabled: !!food
	})

	// mutations
	const { mutate: addFavFoodMutation, isLoading: isAddFavFoodLoading } = useMutation(() => addFavoriteFood({
		user_id: user.id,
		food_id: food!.id,
		source: food!.source
	}), {
		onSuccess: () => {
			queryClient.invalidateQueries(['favorite-foods']);
		}
	})

	const { mutate: removeFavFoodMutation, isLoading: isRemoveFavFoodLoading } = useMutation(() => removeFavoriteFood(
		user.id,
		food!.id,
		food!.source
	), {
		onSuccess: () => {
			queryClient.invalidateQueries(['favorite-foods']);
		}
	})

	const { mutate: addMealMutation, isLoading: isAddMealLoading } = useMutation((newMeal: CreateMeal) => addMeal(newMeal), {
		onSuccess: () => {
			queryClient.invalidateQueries(['daily', user.id, dateYMD]);
			router.push(page.home.diary);
		}
	})

	const onPressHeart = () => {
		setIsFavorite(!isFavorite);

		isFavorite ?
			removeFavFoodMutation() :
			addFavFoodMutation();
	}

	const onPressTrack = async () => {
		if (!food) return;

		let portions = parseInt(nrOfServings);
		if (servingSize === '100 grams') {
			portions = portions * 100;
		}

		let portionSize = ({
			'grams': 'gram',
			'100 grams': 'gram',
			'serving': 'serving',
		} as const)[servingSize];

		addMealMutation({
			user_id: user.id,
			food: food,
			meal_type: 'breakfast',
			portions: portions,
			portion_size: portionSize,
			date: dateYMD,
			source: 'usda'
		})
	}

	if (!food) return null;

	return (
		<View className='h-full w-full flex-col bg-zinc-900'>
			<SafeAreaView className='sticky w-full bg-zinc-800'>
				<View className='w-full flex-row items-center justify-between px-3 py-2'>
					<Pressable onPress={() => router.back()}>
						<ChevronLeftIcon svgClassName='w-6 h-6 text-white' />
					</Pressable>
					<Text className='text-base font-bold text-white'>
						{food.name}
					</Text>
					<Pressable
						onPress={onPressHeart}
					>
						{isFavorite ? (
							<HearIconSolid svgClassName='w-6 h-6 text-white' />
						) : (
							<HeartIcon svgClassName='w-6 h-6 text-white' />
						)}
					</Pressable>
				</View>
			</SafeAreaView>
			<SafeAreaView className='flex-1'>
				<ScrollView className='flex-1'>
					<View className='flex-1 flex-col px-4 py-3'>
						<View className='mb-5 flex-row gap-x-3'>
							<View className='h-14 w-14 flex-row items-center justify-center rounded-lg bg-zinc-800'>
								<TextInput
									className='text-2xl font-bold text-white pb-2'
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
							aminos={food.amino_acids}
						/>

						<NutritionalFacts food={food} />

						<View className='mt-6 mb-4 w-full flex-row justify-center'>
							<Text className='font-bold text-zinc-300'>
								#{food?.id} USDA FoodData Central
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
						disabled={isAddMealLoading}
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
