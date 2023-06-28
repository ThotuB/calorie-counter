import { Stack } from 'expo-router';
import { SetupProvider } from 'src/contexts/SetupContext';

const Layout: React.FC = () => (
	<SetupProvider>
		<Stack
			initialRouteName='accout-creation/WeightGoal'
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
				orientation: 'portrait',
			}}
		/>
	</SetupProvider>
)

export default Layout;
