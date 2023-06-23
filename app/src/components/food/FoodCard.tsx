import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { page } from 'src/constants/routes/app';
import { useDate } from 'src/contexts/DateContext';
import { useAuthedUser } from 'src/contexts/UserContext';
import { CheckIcon, PlusIcon } from 'src/icons/outline';
import { PencilIcon } from 'src/icons/solid';
import { addMeal } from 'src/services/meal';
import { Food } from 'src/types/food';
import { MealType, CreateMeal } from 'src/types/meal-types';

const FoodCard: React.FC<{
	food: Food;
	mealType: MealType;
}> = ({ food, mealType }) => {
	const { id, name, brand, alternative_serving_size, serving_size, serving_size_unit, calories } = food;
	const router = useRouter();
	const queryClient = useQueryClient();
	const { user } = useAuthedUser();
	const { dateYMD } = useDate();

	const { mutate, status } = useMutation((newMeal: CreateMeal) => addMeal(newMeal), {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [dateYMD] });
		}
	});

	const handleShowFood = () => {
		router.push({
			pathname: `${page.nutrition_facts.id}/${id}`,
			params: { name },
		});
	};

	const handleAddFood = async () => {
		mutate({
			user_id: user.id,
			food: food,
			meal_type: mealType,
			portions: 1,
			portion_size: 'serving',
			date: dateYMD,
		})
	}

	return (
		<Pressable
			className='flex-row justify-between items-center rounded-lg bg-zinc-800 px-5 py-3'
			onPress={handleShowFood}
		>
			<View className='flex-1 flex-col'>
				<Text className='text-white'>{name}</Text>
				<View className='flex-row items-center pt-1'>
					<Text className='text-xs text-zinc-500'>{brand}</Text>
					<Text className='text-zinc-500 px-2'>·</Text>
					<Text className='text-xs text-zinc-500'>
						{calories} kcal
					</Text>
				</View>
				<View className='flex-row items-center'>
					<PencilIcon svgClassName='w-2 h-2 text-zinc-500' />
					<Text className='text-zinc-500 px-2'>·</Text>
					<Text className='text-xs text-zinc-500'>
						{alternative_serving_size} ( {serving_size.toFixed(0)} {serving_size_unit} )
					</Text>
				</View>
			</View>
			{status === "idle" && <Pressable className='bg-zinc-900 p-2 rounded-full ml-2'
				onPress={handleAddFood}
			>
				<PlusIcon svgClassName='w-8 h-8 text-white' strokeWidth={2.5} />
			</Pressable>}
			{status === "loading" && <View className='bg-zinc-900 rounded-full w-12 flex-row justify-center items-center h-12 ml-2 p-2'>
				<ActivityIndicator size='small' color='white' />
			</View>}
			{status === "success" && <View className='bg-emerald-500 rounded-full ml-2 p-2'>
				<CheckIcon svgClassName='w-8 h-8 text-white' strokeWidth={2.5} />
			</View>

			}

		</Pressable>
	);
};

export default FoodCard;
