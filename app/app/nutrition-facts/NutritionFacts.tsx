import {
	SafeAreaView,
	View,
	Text,
	ScrollView,
	TextInput,
	Pressable,
} from 'react-native';
import { useState } from 'react';
import FoodRating from './FoodRating';
import { ChevronLeftIcon, ChevronRightIcon } from 'src/icons/outline';
import { HeartIcon } from 'src/icons/solid';
import { Food, Nutrients, Vitamins, Minerals, Aminos } from 'src/types/food';

const NutritionFacts: React.FC<{
	food: Food;
}> = ({ food }) => {
	const [nrOfServings, setNrOfServings] = useState('1');
	const [servingSize, setServingSize] = useState(
		`${food.alternateServingSize} (${food.servingSize})`,
	);

	return (
		<View className='h-full w-full flex-col bg-zinc-900'>
			<SafeAreaView className='sticky w-full bg-zinc-700'>
				<View className='w-full flex-row items-center justify-between px-3 py-2'>
					<ChevronLeftIcon svgClassName='w-6 h-6 text-white' />
					<Text className='text-base font-bold text-white'>
						{food.name}
					</Text>
					<HeartIcon svgClassName='w-6 h-6 text-white' />
				</View>
			</SafeAreaView>
			<ScrollView className='flex-1'>
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
					<FoodRating />

					<View className='mb-3'>
						<Text className='font-bold text-zinc-300'>
							NUTRITIONAL FACTS
						</Text>
					</View>
					<View className='flex-col rounded-lg bg-zinc-700 px-3 py-3'>
						<View className='mb-3 flex-col'>
							<Text className='text-xl font-semibold text-white'>
								{food.name}
							</Text>
							<Text className=' text-base text-white'>
								{food.alternateServingSize} ({food.servingSize})
							</Text>
							<View className='mt-3 flex-row justify-between'>
								<View className='flex-col items-center gap-y-2'>
									<View className='h-24 w-24 flex-row items-center justify-center rounded-full border-8 border-zinc-900'>
										<Text className='text-2xl font-bold text-white'>
											38%
										</Text>
									</View>
									<Text className='text-base font-semibold text-white'>
										Carbs
									</Text>
								</View>
								<View className='flex-col items-center gap-y-2'>
									<View className='h-24 w-24 flex-row items-center justify-center rounded-full border-8 border-zinc-900'>
										<Text className='text-2xl font-bold text-white'>
											21%
										</Text>
									</View>
									<Text className='text-base font-semibold text-white'>
										Protein
									</Text>
								</View>
								<View className='flex-col items-center gap-y-2'>
									<View className='h-24 w-24 flex-row items-center justify-center rounded-full border-8 border-zinc-900'>
										<Text className='text-2xl font-bold text-white'>
											41%
										</Text>
									</View>
									<Text className='text-base font-semibold text-white'>
										Fat
									</Text>
								</View>
							</View>
						</View>
						<View>
							<NutrientTable
								calories={food?.calories}
								nutrients={food?.nutrients}
								vitamins={food?.vitamins}
								minerals={food?.minerals}
								aminos={food?.aminos}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const NutrientTable: React.FC<{
	calories: number;
	nutrients: Nutrients;
	vitamins: Vitamins;
	minerals: Minerals;
	aminos: Aminos;
}> = ({ calories, nutrients, vitamins, minerals, aminos }) => (
	<View className='flex-col gap-y-3'>
		<View className='h-0.5 w-full rounded-full bg-zinc-600' />
		<View>
			<NutrientRow
				exists={true}
				name='Calories'
				amount={100}
				unit='kcal'
				bold
			/>
		</View>
		<View className='h-0.5 w-full rounded-full bg-zinc-600' />
		<View>
			<NutrientRow
				exists={true}
				name='Carbs'
				amount={100}
				unit='g'
				bold
			/>
		</View>
		<View>
			<NutrientRow exists={true} name='Fiber' amount={100} unit='g' />
		</View>
		<View>
			<NutrientRow exists={true} name='Sugar' amount={100} unit='g' />
		</View>
		<View className='h-0.5 w-full rounded-full bg-zinc-600' />
		<View>
			<NutrientRow
				exists={true}
				name='Protein'
				amount={100}
				unit='g'
				bold
			/>
		</View>
		<View className='h-0.5 w-full rounded-full bg-zinc-600' />
		<View>
			<NutrientRow exists={true} name='Fat' amount={100} unit='g' bold />
		</View>
		<View>
			<NutrientRow
				exists={true}
				name='Saturated Fat'
				amount={100}
				unit='g'
			/>
		</View>
		<View>
			<NutrientRow
				exists={true}
				name='Unsaturated Fat'
				amount={100}
				unit='g'
			/>
		</View>
		<View className='h-0.5 w-full rounded-full bg-zinc-600' />
	</View>
);

const NutrientRow: React.FC<{
	exists: boolean;
	name: string;
	amount?: number;
	unit: string;
	bold?: boolean;
}> = ({ exists, name, amount, unit, bold }) => {
	if (!exists) return null;

	return (
		<View className='flex-row justify-between'>
			<Text
				className={`text-base text-zinc-300 ${bold ? 'font-bold' : ''}`}
			>
				{name}
			</Text>
			<Text
				className={`text-base text-zinc-300 ${bold ? 'font-bold' : ''}`}
			>
				{amount} {unit}
			</Text>
		</View>
	);
};

export default NutritionFacts;
