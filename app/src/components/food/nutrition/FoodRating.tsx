import { View, Text } from 'react-native';
import { XIcon } from 'src/icons/outline';
import { Nutrients, Vitamins, Minerals, Aminos } from 'src/types/food';

const FoodRating: React.FC<{
	calories: number;
	nutrients: Nutrients;
	vitamins: Vitamins;
	minerals: Minerals;
	aminos: Aminos;
}> = ({ calories, nutrients, vitamins, minerals, aminos }) => {
	const pros = [
		'High in protein',
		'High in vitamin B6',
		'High in vitamin B12',
		'High in selenium',
		'High in minerals zinc and phosphorus',
	];

	const cons = [
		'Really high in cholesterol',
		'High in sodium',
		'High in saturated fat',
	];

	return (
		<>
			<View className='mb-3'>
				<Text className='font-bold text-zinc-300'>FOOD RATING</Text>
			</View>
			<View className='mb-5 flex-col rounded-lg bg-zinc-700 px-3 py-3'>
				<View className='flex-row items-center justify-center'>
					<Text className='text-3xl font-semibold text-white'>
						{calories}
					</Text>
					<Text className='ml-1 text-xl text-white'>kcal</Text>
				</View>
				<View className='mt-3 flex-row gap-x-2'>
					<View className='flex-1 flex-col gap-y-2'>
						{pros.map((pro, idx) => (
							<View
								key={idx}
								className='flex-row items-start gap-x-1'
							>
								<XIcon
									svgClassName='w-4 h-4 text-green-500'
									strokeWidth={4}
								/>
								<Text className='font-semibold text-white'>
									{pro}
								</Text>
							</View>
						))}
					</View>
					<View className='flex-1 flex-col gap-y-2'>
						{cons.map((con, idx) => (
							<View
								key={idx}
								className='flex-row items-start gap-x-1'
							>
								<XIcon
									svgClassName='w-4 h-4 text-red-500'
									strokeWidth={4}
								/>
								<Text className='font-semibold text-white'>
									{con}
								</Text>
							</View>
						))}
					</View>
				</View>
			</View>
		</>
	);
};

export default FoodRating;
