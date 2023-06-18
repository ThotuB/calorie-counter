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
		<CreateAccountLayout progress={3} question='What is your height?'>
			<View className='w-full flex-1 flex-col justify-between'>
				<View className='relative flex w-full flex-1 flex-col justify-center'>
					<View className='absolute z-10 w-full flex-row rounded-full bg-purple-400 py-8' />
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
				<NextButton href={page.auth.accout_setup.weight_selection} />
			</View>
		</CreateAccountLayout>
	);
};

export default HeightSelection;
