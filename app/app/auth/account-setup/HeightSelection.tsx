import { View, Text, Pressable, ScrollView, Dimensions } from 'react-native';
import CreateAccountLayout from 'src/layouts/CreateAccountLayout';
import Carousel from 'react-native-snap-carousel';
import { useEffect, useRef, useState } from 'react';
import { page } from 'src/constants/routes/app';
import NextButton from 'src/components/auth/NextButton';
// import Carousel from "../../components/carousel/Carousel";

const metricBigNumbers = Array.from(Array(300).keys());
const metricSmallNumbers = Array.from(Array(10).keys());

const imperialBigNumbers = Array.from(Array(8).keys()).map((_, i) => i + 1);
const imperialSmallNumbers = Array.from(Array(12).keys());

const metricOptions = {
	big: metricBigNumbers,
	small: metricSmallNumbers,
	symbol1: '.',
	symbol2: '_',
};

const imperialOptions = {
	big: imperialBigNumbers,
	small: imperialSmallNumbers,
	symbol1: "'",
	symbol2: '"',
};

const HeightSelection = () => {
	const [system, setSystem] = useState<'cm' | 'ft/in'>('cm');
	const [bigNumber, setBigNumber] = useState<number>(170);
	const [smallNumber, setSmallNumber] = useState<number>(0);

	const [numberOptions, setNumberOptions] = useState<{
		big: number[];
		small: number[];
		symbol1: string;
		symbol2: string;
	}>(metricOptions);

	useEffect(() => {
		if (system === 'cm') {
			setNumberOptions(metricOptions);
		} else {
			setNumberOptions(imperialOptions);
		}
	}, [system]);

	return (
		<CreateAccountLayout progress={3} question='What is your height?'>
			<View className='w-full flex-1 flex-col justify-between'>
				<View className='relative flex w-full flex-1 flex-col justify-center'>
					<View className='absolute z-10 w-full flex-row rounded-full bg-purple-400 py-8' />
					<View className='z-20 flex w-full flex-row items-center justify-around px-8'>
						{/* <View>
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
							/>
						</View>
						<Text className='text-2xl font-bold text-white'>
							{numberOptions.symbol1}
						</Text>
						<View>
							<Carousel
								vertical
								data={numberOptions.small}
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
							{numberOptions.symbol2}
						</Text>
						<View>
							<Carousel
								vertical
								data={['cm', 'ft/in']}
								renderItem={RenderItem}
								sliderHeight={
									Dimensions.get('window').height / 2
								}
								itemHeight={60}
								sliderWidth={60}
								onSnapToItem={(index) =>
									setSystem(index === 0 ? 'cm' : 'ft/in')
								}
							/>
						</View> */}
						{/* <Carousel
                        data={numberOptions.big}
                        renderItem={(item, index) => (
                            <View className="py-4">
                                <Text className="text-2xl font-bold text-white">
                                    {item}
                                </Text>
                            </View>
                        )}
                    /> */}
					</View>
				</View>
				<NextButton href={page.auth.accout_setup.weight_selection} />
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

export default HeightSelection;
