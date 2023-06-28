import { View, Text } from 'react-native';
import { page } from 'src/constants/routes/app';
import NextButton from 'src/components/auth/NextButton';
import { useSetup } from 'src/contexts/SetupContext';
import Carousel from 'src/components/carousel/Carousel';

const options = Array.from(Array(50).keys()).map((i) => i + 15);

const HeightSelection = () => {
    const { age, setAge } = useSetup();

    const handleIndexChange = (index: number) => {
        setAge(index + 15);
    }

    return (
        <View className='w-full flex-1 flex-col justify-between'>
            <View className='py-8 flex-row justify-center'>
                <Text className='text-2xl font-bold text-white'>
                    What is your age?
                </Text>
            </View>
            <View className='relative flex w-full flex-1 flex-col justify-center'>
                <View className='absolute z-10 w-full flex-row rounded-full bg-green-400 py-8' />
                <View className='z-20 flex-row items-center justify-evenly px-8'>
                    <View>
                        <Carousel
                            data={options}
                            index={5}
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
                        years
                    </Text>
                </View>
            </View>
            <NextButton href={page.auth.sign_up.account_setup.height_selection} />
        </View>
    );
};

export default HeightSelection;
