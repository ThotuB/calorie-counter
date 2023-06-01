import { useQuery } from '@tanstack/react-query';
import { ScrollView, View, Text } from 'react-native';
import { getFood } from 'src/services/usda-food';
import { SearchResultFoodDto } from 'src/types/usda-food';
import FoodCard from 'src/components/food/FoodCard';

const SearchResults: React.FC<{
	searchTerm: string;
}> = ({ searchTerm }) => {
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
							<FoodCard food={food} />
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default SearchResults;

const food: SearchResultFoodDto[] = [
	{
		fdcId: 2499650,
		description: 'DR. B SODA, DR. B',
		dataType: 'Branded',
		gtinUpc: '041220820757',
		publishedDate: '2023-03-16',
		brandOwner: 'H E Butt Grocery Company',
		brandName: 'H-E-B',
		ingredients:
			'CARBONATED WATER, CANE SUGAR, CARAMEL COLOR, SODIUM BENZOATE (PRESERVATIVE), PHOSPHORIC ACID, LACTIC ACID, CAFFEINE (41MG PER SERVING), NATURAL AND ARTIFICIAL FLAVORS.',
		marketCountry: 'United States',
		foodCategory: 'Soda',
		modifiedDate: '2023-01-10',
		dataSource: 'LI',
		packageWeight: '144 fl oz/4.26 L',
		servingSizeUnit: 'MLT',
		servingSize: 355,
		householdServingFullText: '1 can',
		shortDescription: '',
		tradeChannels: ['NO_TRADE_CHANNEL'],
		allHighlightFields: '',
		score: 43.62338,
		microbes: [],
		foodNutrients: [
			{
				nutrientId: 1003,
				nutrientName: 'Protein',
				nutrientNumber: '203',
				unitName: 'G',
				derivationCode: 'LCCS',
				derivationDescription:
					'Calculated from value per serving size measure',
				derivationId: 70,
				value: 0,
				foodNutrientSourceId: 9,
				foodNutrientSourceCode: '12',
				foodNutrientSourceDescription:
					"Manufacturer's analytical; partial documentation",
				rank: 600,
				indentLevel: 1,
				foodNutrientId: 31039677,
			},
			{
				nutrientId: 1004,
				nutrientName: 'Total lipid (fat)',
				nutrientNumber: '204',
				unitName: 'G',
				derivationCode: 'LCCS',
				derivationDescription:
					'Calculated from value per serving size measure',
				derivationId: 70,
				value: 0,
				foodNutrientSourceId: 9,
				foodNutrientSourceCode: '12',
				foodNutrientSourceDescription:
					"Manufacturer's analytical; partial documentation",
				rank: 800,
				indentLevel: 1,
				foodNutrientId: 31039678,
				percentDailyValue: 0,
			},
			{
				nutrientId: 1005,
				nutrientName: 'Carbohydrate, by difference',
				nutrientNumber: '205',
				unitName: 'G',
				derivationCode: 'LCCS',
				derivationDescription:
					'Calculated from value per serving size measure',
				derivationId: 70,
				value: 11.6,
				foodNutrientSourceId: 9,
				foodNutrientSourceCode: '12',
				foodNutrientSourceDescription:
					"Manufacturer's analytical; partial documentation",
				rank: 1110,
				indentLevel: 2,
				foodNutrientId: 31039679,
				percentDailyValue: 15,
			},
			{
				nutrientId: 1008,
				nutrientName: 'Energy',
				nutrientNumber: '208',
				unitName: 'KCAL',
				derivationCode: 'LCCS',
				derivationDescription:
					'Calculated from value per serving size measure',
				derivationId: 70,
				value: 48,
				foodNutrientSourceId: 9,
				foodNutrientSourceCode: '12',
				foodNutrientSourceDescription:
					"Manufacturer's analytical; partial documentation",
				rank: 300,
				indentLevel: 1,
				foodNutrientId: 31039680,
			},
			{
				nutrientId: 2000,
				nutrientName: 'Sugars, total including NLEA',
				nutrientNumber: '269',
				unitName: 'G',
				derivationCode: 'LCCS',
				derivationDescription:
					'Calculated from value per serving size measure',
				derivationId: 70,
				value: 11.6,
				foodNutrientSourceId: 9,
				foodNutrientSourceCode: '12',
				foodNutrientSourceDescription:
					"Manufacturer's analytical; partial documentation",
				rank: 1510,
				indentLevel: 3,
				foodNutrientId: 31039681,
			},
			{
				nutrientId: 1093,
				nutrientName: 'Sodium, Na',
				nutrientNumber: '307',
				unitName: 'MG',
				derivationCode: 'LCCS',
				derivationDescription:
					'Calculated from value per serving size measure',
				derivationId: 70,
				value: 7,
				foodNutrientSourceId: 9,
				foodNutrientSourceCode: '12',
				foodNutrientSourceDescription:
					"Manufacturer's analytical; partial documentation",
				rank: 5800,
				indentLevel: 1,
				foodNutrientId: 31039682,
				percentDailyValue: 1,
			},
			{
				nutrientId: 1235,
				nutrientName: 'Sugars, added',
				nutrientNumber: '539',
				unitName: 'G',
				derivationCode: 'LCCS',
				derivationDescription:
					'Calculated from value per serving size measure',
				derivationId: 70,
				value: 11.5,
				foodNutrientSourceId: 9,
				foodNutrientSourceCode: '12',
				foodNutrientSourceDescription:
					"Manufacturer's analytical; partial documentation",
				rank: 1540,
				indentLevel: 0,
				foodNutrientId: 31039683,
				percentDailyValue: 82,
			},
		],
		finalFoodInputFoods: [],
		foodMeasures: [],
		foodAttributes: [],
		foodAttributeTypes: [],
		foodVersionIds: [],
	},
	{
		fdcId: 2373418,
		description: 'DR. B SODA, DR. B',
		dataType: 'Branded',
		gtinUpc: '041220088522',
		publishedDate: '2022-12-07',
		brandOwner: 'H E Butt Grocery Company',
		brandName: 'H-E-B',
		ingredients:
			'CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, CARAMEL COLOR, SODIUM BENZOATE (PRESERVATIVE), PHOSPHORIC ACID, LACTIC ACID, CAFFEINE (40MG PER SERVING), NATURAL AND ARTIFICIAL FLAVORS.',
		marketCountry: 'United States',
		foodCategory: 'Soda',
		modifiedDate: '2022-10-29',
		dataSource: 'LI',
		packageWeight: '67.6 fl oz/2 L',
		servingSizeUnit: 'ml',
		servingSize: 360,
		householdServingFullText: '12 OZA',
		shortDescription: '',
		tradeChannels: ['NO_TRADE_CHANNEL'],
		allHighlightFields: '',
		score: 43.62338,
		microbes: [],
		foodNutrients: [
			{
				nutrientId: 1003,
				nutrientName: 'Protein',
				nutrientNumber: '203',
				unitName: 'G',
				derivationCode: 'LCCS',
				derivationDescription:
					'Calculated from value per serving size measure',
				derivationId: 70,
				value: 0,
				foodNutrientSourceId: 9,
				foodNutrientSourceCode: '12',
				foodNutrientSourceDescription:
					"Manufacturer's analytical; partial documentation",
				rank: 600,
				indentLevel: 1,
				foodNutrientId: 29182209,
			},
			{
				nutrientId: 1004,
				nutrientName: 'Total lipid (fat)',
				nutrientNumber: '204',
				unitName: 'G',
				derivationCode: 'LCCD',
				derivationDescription:
					'Calculated from a daily value percentage per serving size measure',
				derivationId: 75,
				value: 0,
				foodNutrientSourceId: 9,
				foodNutrientSourceCode: '12',
				foodNutrientSourceDescription:
					"Manufacturer's analytical; partial documentation",
				rank: 800,
				indentLevel: 1,
				foodNutrientId: 29182210,
				percentDailyValue: 0,
			},
			{
				nutrientId: 1005,
				nutrientName: 'Carbohydrate, by difference',
				nutrientNumber: '205',
				unitName: 'G',
				derivationCode: 'LCCS',
				derivationDescription:
					'Calculated from value per serving size measure',
				derivationId: 70,
				value: 11.4,
				foodNutrientSourceId: 9,
				foodNutrientSourceCode: '12',
				foodNutrientSourceDescription:
					"Manufacturer's analytical; partial documentation",
				rank: 1110,
				indentLevel: 2,
				foodNutrientId: 29182211,
				percentDailyValue: 15,
			},
			{
				nutrientId: 1008,
				nutrientName: 'Energy',
				nutrientNumber: '208',
				unitName: 'KCAL',
				derivationCode: 'LCCS',
				derivationDescription:
					'Calculated from value per serving size measure',
				derivationId: 70,
				value: 42,
				foodNutrientSourceId: 9,
				foodNutrientSourceCode: '12',
				foodNutrientSourceDescription:
					"Manufacturer's analytical; partial documentation",
				rank: 300,
				indentLevel: 1,
				foodNutrientId: 29182212,
			},
			{
				nutrientId: 2000,
				nutrientName: 'Sugars, total including NLEA',
				nutrientNumber: '269',
				unitName: 'G',
				derivationCode: 'LCCS',
				derivationDescription:
					'Calculated from value per serving size measure',
				derivationId: 70,
				value: 11.1,
				foodNutrientSourceId: 9,
				foodNutrientSourceCode: '12',
				foodNutrientSourceDescription:
					"Manufacturer's analytical; partial documentation",
				rank: 1510,
				indentLevel: 3,
				foodNutrientId: 29182213,
			},
			{
				nutrientId: 1093,
				nutrientName: 'Sodium, Na',
				nutrientNumber: '307',
				unitName: 'MG',
				derivationCode: 'LCCS',
				derivationDescription:
					'Calculated from value per serving size measure',
				derivationId: 70,
				value: 11,
				foodNutrientSourceId: 9,
				foodNutrientSourceCode: '12',
				foodNutrientSourceDescription:
					"Manufacturer's analytical; partial documentation",
				rank: 5800,
				indentLevel: 1,
				foodNutrientId: 29182214,
				percentDailyValue: 2,
			},
			{
				nutrientId: 1235,
				nutrientName: 'Sugars, added',
				nutrientNumber: '539',
				unitName: 'G',
				derivationCode: 'LCCS',
				derivationDescription:
					'Calculated from value per serving size measure',
				derivationId: 70,
				value: 11.1,
				foodNutrientSourceId: 9,
				foodNutrientSourceCode: '12',
				foodNutrientSourceDescription:
					"Manufacturer's analytical; partial documentation",
				rank: 1540,
				indentLevel: 0,
				foodNutrientId: 29182215,
				percentDailyValue: 80,
			},
		],
		finalFoodInputFoods: [],
		foodMeasures: [],
		foodAttributes: [],
		foodAttributeTypes: [],
		foodVersionIds: [],
	},
];
