import { useQuery } from '@tanstack/react-query';
import { ScrollView, View, Text } from 'react-native';
import { getFood } from 'src/services/usda-food';
import { SearchResultFoodDto } from 'src/types/usda-food';
import FoodCard from 'src/components/food/FoodCard';
import { MealType } from 'src/types/meal';

const SearchResults: React.FC<{
	searchTerm: string;
	mealType: MealType
}> = ({ searchTerm, mealType }) => {
	const page = 1;
	const { data: foods, status } = useQuery(['foods', searchTerm, page], () =>
		getFood(searchTerm, page),
	);

	return (
		<View className='h-full flex-1 flex-col bg-zinc-900 p-4'>
			<Text className='font-bold text-zinc-300'>RESULTS</Text>
			<ScrollView className='mt-2'>
				<View className='flex-col gap-y-4'>
					{foods?.map((food, idx) => (
						<View key={idx}>
							<FoodCard food={food} mealType={mealType} />
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default SearchResults;
