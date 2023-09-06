import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Nutrients, Vitamins, Minerals, Aminos, Food } from 'src/types/food';
import { ChevronDownIcon, ChevronRightIcon } from 'src/icons/outline';

const NutritionalFacts: React.FC<{
	food: Food;
}> = ({ food }) => {
	const { name, brand } = food;
	const { nutrients, vitamins, minerals, amino_acids } = food;
	const { serving_size, serving_size_unit, alternative_serving_size } = food;
	const { carbs, protein, fat } = nutrients;

	const total = carbs * 4 + protein * 4 + fat * 9;
	const carbsPercent = Math.round(((carbs * 4) / total) * 100);
	const proteinPercent = Math.round(((protein * 4) / total) * 100);
	const fatPercent = 100 - carbsPercent - proteinPercent;

	return (
		<>
			<View className='mb-3'>
				<Text className='font-bold text-zinc-300'>
					NUTRITIONAL FACTS
				</Text>
			</View>
			<View className='flex-col rounded-lg bg-zinc-800 px-3 py-3'>
				<View className='mb-3 flex-col'>
					<Text className='text-xl font-semibold text-white'>
						{name}
					</Text>
					<Text className=' text-base text-white'>
						{alternative_serving_size} ({serving_size.toFixed(0)} {serving_size_unit})
					</Text>
					<View className='mt-3 flex-row justify-between'>
						<View className='flex-col items-center gap-y-2'>
							<View className='h-24 w-24 flex-row items-center justify-center rounded-full border-8 border-zinc-100'>
								<Text className='text-2xl font-bold text-white'>
									{carbsPercent}%
								</Text>
							</View>
							<Text className='text-base font-semibold text-white'>
								Carbs
							</Text>
						</View>
						<View className='flex-col items-center gap-y-2'>
							<View className='h-24 w-24 flex-row items-center justify-center rounded-full border-8 border-zinc-100'>
								<Text className='text-2xl font-bold text-white'>
									{proteinPercent}%
								</Text>
							</View>
							<Text className='text-base font-semibold text-white'>
								Protein
							</Text>
						</View>
						<View className='flex-col items-center gap-y-2'>
							<View className='h-24 w-24 flex-row items-center justify-center rounded-full border-8 border-zinc-100'>
								<Text className='text-2xl font-bold text-white'>
									{fatPercent}%
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
						calories={food.calories}
						nutrients={food.nutrients}
						vitamins={food.vitamins}
						minerals={food.minerals}
						aminos={food.amino_acids}
					/>
				</View>
			</View>
		</>
	);
};

const NutrientTable: React.FC<{
	calories: number;
	nutrients: Nutrients;
	vitamins: Vitamins;
	minerals: Minerals;
	aminos: Aminos;
}> = ({ calories, nutrients, vitamins, minerals, aminos }) => (
	<View className='flex-col'>
		<Divider />
		<NutrientRow name='Calories' amount={calories} unit='kcal' bold />
		<Divider />
		<NutrientRow name='Carbs' amount={nutrients.carbs} unit='g' bold />
		<NutrientRow name='Fiber' amount={nutrients.fiber} unit='g' />
		<NutrientRow name='Sugar' amount={nutrients.sugar} unit='g' />
		<Divider />
		<NutrientRow name='Protein' amount={nutrients.protein} unit='g' bold />
		<Divider />
		<NutrientRow name='Fat' amount={nutrients.fat} unit='g' bold />
		<NutrientRow
			name='Saturated Fat'
			amount={nutrients.saturated_fat}
			unit='g'
		/>
		<NutrientRow
			name='Unsaturated Fat'
			amount={nutrients.unsaturated_fat}
			unit='g'
		/>
		<Divider />

		<Section title='VITAMINS'>
			<NutrientRow name='Vitamin A' amount={vitamins.A} unit='mcg' />
			<NutrientRow name='Vitamin B1' amount={vitamins.B1} unit='mg' />
			<NutrientRow name='Vitamin B2' amount={vitamins.B2} unit='mg' />
			<NutrientRow name='Vitamin B3' amount={vitamins.B3} unit='mg' />
			<NutrientRow name='Vitamin B5' amount={vitamins.B5} unit='mg' />
			<NutrientRow name='Vitamin B6' amount={vitamins.B6} unit='mg' />
			<NutrientRow name='Vitamin B7' amount={vitamins.B7} unit='mcg' />
			<NutrientRow name='Vitamin B9' amount={vitamins.B9} unit='mcg' />
			<NutrientRow name='Vitamin B12' amount={vitamins.B12} unit='mcg' />
			<NutrientRow name='Vitamin C' amount={vitamins.C} unit='mg' />
			<NutrientRow name='Vitamin D' amount={vitamins.D} unit='mcg' />
			<NutrientRow name='Vitamin E' amount={vitamins.E} unit='mg' />
			<NutrientRow name='Vitamin K' amount={vitamins.K} unit='mcg' />
		</Section>
		<Divider />

		<Section title='MINERALS'>
			<NutrientRow name='Calcium' amount={minerals.calcium} unit='mg' />
			{/* <NutrientRow name='Chloride' amount={minerals.chloride} unit='mg' /> */}
			<NutrientRow name='Chromium' amount={minerals.chromium} unit='mg' />
			<NutrientRow name='Copper' amount={minerals.copper} unit='mg' />
			{/* <NutrientRow name='Fluoride' amount={minerals.fluoride} unit='mg' /> */}
			<NutrientRow name='Iodine' amount={minerals.iodine} unit='mcg' />
			<NutrientRow name='Iron' amount={minerals.iron} unit='mg' />
			<NutrientRow
				name='Magnesium'
				amount={minerals.magnesium}
				unit='mg'
			/>
			<NutrientRow
				name='Manganese'
				amount={minerals.manganese}
				unit='mg'
			/>
			<NutrientRow
				name='Molybdenum'
				amount={minerals.molybdenum}
				unit='mcg'
			/>
			<NutrientRow
				name='Phosphorus'
				amount={minerals.phosphorus}
				unit='mg'
			/>
			<NutrientRow
				name='Potassium'
				amount={minerals.potassium}
				unit='mg'
			/>
			<NutrientRow
				name='Selenium'
				amount={minerals.selenium}
				unit='mcg'
			/>
			<NutrientRow name='Sodium' amount={minerals.sodium} unit='mg' />
			<NutrientRow name='Zinc' amount={minerals.zinc} unit='mg' />
		</Section>
		<Divider />

		<Section title='AMINO ACIDS'>
			<NutrientRow name='Alanine' amount={aminos.alanine} unit='g' />
			<NutrientRow name='Arginine' amount={aminos.arginine} unit='g' />
			{/* <NutrientRow name='Aspartic Acid' amount={aminos.asparticAcid} unit='g' /> */}
			<NutrientRow name='Cystine' amount={aminos.cystine} unit='g' />
			{/* <NutrientRow name='Glutamic Acid' amount={aminos.glutamicAcid} unit='g' /> */}
			<NutrientRow name='Glycine' amount={aminos.glycine} unit='g' />
			<NutrientRow name='Histidine' amount={aminos.histidine} unit='g' />
			<NutrientRow
				name='Isoleucine'
				amount={aminos.isoleucine}
				unit='g'
			/>
			<NutrientRow name='Leucine' amount={aminos.leucine} unit='g' />
			<NutrientRow name='Lysine' amount={aminos.lysine} unit='g' />
			<NutrientRow
				name='Methionine'
				amount={aminos.methionine}
				unit='g'
			/>
			<NutrientRow
				name='Phenylalanine'
				amount={aminos.phenylalanine}
				unit='g'
			/>
			<NutrientRow name='Proline' amount={aminos.proline} unit='g' />
			<NutrientRow name='Serine' amount={aminos.serine} unit='g' />
			<NutrientRow name='Threonine' amount={aminos.threonine} unit='g' />
			<NutrientRow
				name='Tryptophan'
				amount={aminos.tryptophan}
				unit='g'
			/>
			<NutrientRow name='Tyrosine' amount={aminos.tyrosine} unit='g' />
			<NutrientRow name='Valine' amount={aminos.valine} unit='g' />
		</Section>
	</View>
);

const Divider = () => <View className='h-0.5 my-1 w-full rounded-full bg-zinc-600' />

const Section: React.FC<{
	title: string;
	children: React.ReactNode;
}> = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<View className='my-2 flex-row items-center justify-between'>
				<Text className='text-lg font-bold text-zinc-300'>{title}</Text>
				<Pressable onPress={() => setIsOpen(!isOpen)}>
					{isOpen ? (
						<ChevronDownIcon
							svgClassName='w-4 h-4 text-zinc-300'
							strokeWidth={3}
						/>
					) : (
						<ChevronRightIcon
							svgClassName='w-4 h-4 text-zinc-300'
							strokeWidth={3}
						/>
					)}
				</Pressable>
			</View>
			{isOpen && children}
		</>
	);
};

const NutrientRow: React.FC<{
	name: string;
	amount?: number;
	unit: string;
	bold?: boolean;
}> = ({ name, amount, unit, bold }) => {
	if (amount === undefined) return null;

	return (
		<View className='my-1 flex-row justify-between'>
			<Text
				className={`text-base text-zinc-300 ${bold ? 'font-bold' : ''}`}
			>
				{name}
			</Text>
			<Text
				className={`text-base text-zinc-300 ${bold ? 'font-bold' : ''}`}
			>
				{amount?.toFixed(0) || 0} {unit}
			</Text>
		</View>
	);
};

export default NutritionalFacts;
