import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { page } from 'src/constants/routes/app';
import { useAuthedUser } from 'src/contexts/UserContext';
import { CheckIcon, PlusIcon } from 'src/icons/outline';
import { PencilIcon } from 'src/icons/solid';
import { addMeal } from 'src/services/meal';
import { Food } from 'src/types/food';
import { MealType, NewMealDto } from 'src/types/meal';
import { dateToYYYYMMDD } from 'src/utils/date';

const FoodCard: React.FC<{
	food: Food;
	mealType: MealType;
}> = ({ food, mealType }) => {
	const { id, name, brand, alternateServingSize, servingSize, calories } = food;
	const router = useRouter();
	const queryClient = useQueryClient();
	const { user } = useAuthedUser();

	const { mutate, status } = useMutation((newMeal: NewMealDto) => addMeal(newMeal), {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['meal'] });
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
			food_id: id,
			meal_type: mealType,
			portions: 1,
			portion_size: 'serving',
			date: dateToYYYYMMDD(new Date()),
		})
	}

	return (
		<Pressable
			className='flex-row justify-between items-center rounded-lg bg-zinc-800 px-5 py-3'
			onPress={handleShowFood}
		>
			<View className='flex-1 flex-col gap-y-1'>
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
