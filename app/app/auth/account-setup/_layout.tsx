import { Stack } from 'expo-router';
import { SetupProvider } from 'src/contexts/SetupContext';

const Layout: React.FC = () => {
	return (
		<SetupProvider>
			<Stack
				initialRouteName='accout-creation/WeightGoal'
				screenOptions={{
					headerShown: false,
					animation: 'none',
					orientation: 'portrait',
				}}
			/>
		</SetupProvider>
	);
};

export default Layout;
