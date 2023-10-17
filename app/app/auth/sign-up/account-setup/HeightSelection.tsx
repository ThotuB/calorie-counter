import { View, Text } from 'react-native';
import CreateAccountLayout from 'src/layouts/CreateAccountLayout';
import { page } from 'src/constants/routes/app';
import NextButton from 'src/components/auth/NextButton';
import { useSetup } from 'src/contexts/SetupContext';
import Carousel from 'src/components/carousel/Carousel';

const metricOptions = Array.from(Array(100).keys()).map((i) => i + 140);

const HeightSelection = () => {
	const { height, setHeight } = useSetup();
	const { type } = height;

	const handleIndexChange = (index: number) => {
		setHeight({
			type: 'metric',
			cm: index + 140,
		});
	};

	return (
		<View className='w-full flex-1 flex-col justify-between'>
			<View className='py-8 flex-row justify-center'>
				<Text className='text-2xl font-bold text-white'>
					What is your height?
				</Text>
			</View>
			<View className='relative w-full flex-1 flex-col justify-center'>
				<View className='absolute z-10 w-full flex-row rounded-full bg-green-400 py-8' />
				<View className='z-20 flex-row items-center justify-evenly px-8'>
					<View>
						<Carousel
							data={metricOptions}
							index={30}
							onIndexChange={handleIndexChange}
							renderItem={(item, _) => (
								<View className='py-4'>
									<Text className='text-2xl font-bold text-white'>
										{item}
									</Text>
								</View>
							)}
						/>
					</View>
					<Text className='text-2xl font-bold text-white'>
						cm
					</Text>
				</View>
			</View>
			<NextButton href={page.auth.sign_up.account_setup.weight_selection}
				progress={5}
			/>
		</View>
	);
};

export default HeightSelection;
