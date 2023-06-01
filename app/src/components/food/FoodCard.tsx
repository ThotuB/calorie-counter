import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { PencilIcon } from 'src/icons/solid';
import { Food } from 'src/types/food';

const FoodCard: React.FC<{
	food: Food;
}> = ({ food }) => {
	const { id, name, brand, alternateServingSize, servingSize, calories } =
		food;
	const router = useRouter();

	const handlePress = () => {
		router.push({
			pathname: `/nutrition-facts/${id}`,
			params: { name },
		});
	};

	return (
		<Pressable
			className='flex-row justify-between rounded-lg bg-zinc-800 px-5 py-3'
			onPress={handlePress}
		>
			<View className='flex-col gap-y-1'>
				<Text className='text-white'>{name}</Text>
				<View className='flex-row items-center gap-x-1'>
					<Text className='text-xs text-zinc-500'>{brand}</Text>
					<Text className='text-zinc-500'>·</Text>
					<Text className='text-xs text-zinc-500'>
						{calories} kcal
					</Text>
				</View>
				<View className='flex-row items-center gap-x-1'>
					<PencilIcon svgClassName='w-2 h-2 text-zinc-500' />
					<Text className='text-zinc-500'>·</Text>
					<Text className='text-xs text-zinc-500'>
						{alternateServingSize} ( {servingSize} )
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default FoodCard;
