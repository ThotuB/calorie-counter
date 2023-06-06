import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { page } from 'src/constants/routes/app';

const App = () => {
	const isAccountCreated = true;

	const router = useRouter();

	const handlePress = () => {
		router.push(
			isAccountCreated ? page.home.diary : page.auth.authentication,
		);
	};

	return (
		<Pressable
			className='h-full w-full flex-row items-center justify-center'
			onPress={handlePress}
		>
			<Text>Press me</Text>
		</Pressable>
	);
};

export default App;
