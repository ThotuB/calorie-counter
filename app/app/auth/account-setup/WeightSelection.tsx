import { View, Text } from 'react-native';
import CreateAccountLayout from 'src/layouts/CreateAccountLayout';
import { page } from 'src/constants/routes/app';
import NextButton from 'src/components/auth/NextButton';
import Carousel from "src/components/carousel/Carousel";
import { useSetup } from 'src/contexts/SetupContext';

const metricOptions = Array.from(Array(200).keys()).map((_, i) => i + 20);
const imperialOptions = Array.from(Array(400).keys()).map((_, i) => i + 50);

const WeightSelection = () => {
	const { weight, setWeight } = useSetup();

	const handleIndexChange = (index: number) => {
		setWeight({
			type: 'metric',
			kg: index + 20,
		});
	};

	return (
		<CreateAccountLayout progress={4} question='What is your weight?'>
			<View className='w-full flex-1 flex-col justify-between'>
				<View className='relative flex w-full flex-1 flex-col justify-center'>
					<View className='absolute z-10 w-full flex-row rounded-full bg-purple-400 py-8' />
					<View className='z-20 flex flex-row items-center justify-evenly px-8'>
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
						<View>
							<Carousel
								data={['kg']}
								index={0}
								renderItem={(item, _) => (
									<View className='py-4'>
										<Text className='text-2xl font-bold text-white'>
											{item}
										</Text>
									</View>
								)}
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
