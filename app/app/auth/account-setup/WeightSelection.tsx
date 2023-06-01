import { View, Text, Pressable, ScrollView, Dimensions } from 'react-native';
import CreateAccountLayout from 'src/layouts/CreateAccountLayout';
import Carousel from 'react-native-snap-carousel';
import { useEffect, useRef, useState } from 'react';
import { page } from 'src/constants/routes/app';
import NextButton from 'src/components/auth/NextButton';
// import Carousel from "../../components/carousel/Carousel";

const metricBigNumbers = Array.from(Array(200).keys()).map((_, i) => i + 20);
const imperialBigNumbers = Array.from(Array(400).keys()).map((_, i) => i + 50);

const smallNumbers = Array.from(Array(10).keys());

const WeightSelection = () => {
	const [system, setSystem] = useState<'kg' | 'lbs'>('kg');
	const [bigNumber, setBigNumber] = useState<number>(50);
	const [smallNumber, setSmallNumber] = useState<number>(0);

	const [numberOptions, setNumberOptions] = useState<{
		big: number[];
		firstBig: number;
		firstSmall: number;
	}>({
		big: metricBigNumbers,
		firstBig: 50,
		firstSmall: 0,
	});

	useEffect(() => {
		// if (system === 'kg') {
		//     setNumberOptions({
		//         big: metricBigNumbers,
		//
		//     })
		// } else {
		//     setNumberOptions(imperialBigNumbers)
		// }
	}, [system]);

	return (
		<CreateAccountLayout progress={4} question='What is your weight?'>
			<View className='w-full flex-1 flex-col justify-between'>
				<View className='relative flex w-full flex-1 flex-col justify-center'>
					<View className='absolute z-10 w-full flex-row rounded-full bg-purple-400 py-8' />
					<View className='z-20 flex w-full flex-row items-center justify-around px-8'>
						<View>
							<Carousel
								vertical
								data={numberOptions.big}
								renderItem={RenderItem}
								sliderHeight={
									Dimensions.get('window').height / 2
								}
								itemHeight={60}
								sliderWidth={60}
								onSnapToItem={(index) => setBigNumber(index)}
								firstItem={50}
							/>
						</View>
						<Text className='text-2xl font-bold text-white'>.</Text>
						<View>
							<Carousel
								vertical
								data={smallNumbers}
								renderItem={RenderItem}
								sliderHeight={
									Dimensions.get('window').height / 2
								}
								itemHeight={60}
								sliderWidth={60}
								onSnapToItem={(index) => setSmallNumber(index)}
							/>
						</View>
						<Text className='text-2xl font-bold text-white'>
							&nbsp;
						</Text>
						<View>
							<Carousel
								vertical
								data={['kg', 'lbs']}
								renderItem={RenderItem}
								sliderHeight={
									Dimensions.get('window').height / 2
								}
								itemHeight={60}
								sliderWidth={60}
								onSnapToItem={(index) =>
									setSystem(index === 0 ? 'kg' : 'lbs')
								}
							/>
						</View>
					</View>
				</View>
				<NextButton href={page.auth.accout_setup.sign_up} />
			</View>
		</CreateAccountLayout>
	);
};

const RenderItem = <T extends React.ReactNode>({
	item,
	index,
}: {
	item: T;
	index: number;
}) => {
	return (
		<View className='py-4'>
			<Text className='text-2xl font-bold text-white'>{item}</Text>
		</View>
	);
};

export default WeightSelection;
