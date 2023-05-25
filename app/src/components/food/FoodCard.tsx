import { Text, View } from 'react-native';

const FoodCard: React.FC<{
	id: number;
	name: string;
	description: string;
	calories: number;
	macros: {
		carbs: number;
		fat: number;
		protein: number;
		calories: number;
	};
	company: string;
	rating: number;
	servingSize: number;
	servingUnit: string;
}> = ({
	id,
	description,
	calories,
	macros,
	company,
	servingSize,
	servingUnit,
}) => {
	const handleSize = () => {
		undefined;
	};

	const handleAdd = () => {
		undefined;
	};

	const handleDetails = () => {
		undefined;
	};

	return (
		<View className='border-dark mx-auto flex w-full max-w-3xl overflow-hidden rounded-xl border-4 bg-purple-300'>
			<View className='flex w-4/5 flex-col justify-between gap-2 p-4'>
				<View>
					<View className='flex justify-between gap-2'>
						<Text className='text-primary text-2xl font-bold'>
							{description}
						</Text>
					</View>

					<Text className='mt-1 px-2 text-lg font-semibold italic text-white'>
						{company}
					</Text>
				</View>

				<View className='flex justify-between'>
					<View className='flex'>
						<Text className='text-2xl font-bold text-white'>
							{calories} kcal
						</Text>
						<Text className='self-center pl-2 font-light italic text-white'>
							/ {servingSize} {servingUnit}
						</Text>
					</View>
					<Text className='flex gap-2'>
						{/* <Button onClick={handleSize} className="px-3">
                            <ChevronLeftIcon className="w-5" />
                            <ChevronUpIcon className="hidden " />
                        </Button>
                        <Button onClick={handleAdd} className="px-2">
                            <PlusIcon className='w-5' />
                        </Button>
                        <Button onClick={handleDetails}>
                            DETAILS
                        </Button> */}
					</Text>
				</View>
			</View>

			{/* <FoodDoughnut macros={macros} calories={macros.calories} /> */}
		</View>
	);
};

export default FoodCard;
