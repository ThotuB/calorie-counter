import { Stack } from 'expo-router';

const Layout: React.FC = () => {
	return (
		<Stack
			initialRouteName='accout-creation/WeightGoal'
			screenOptions={{
				headerShown: false,
				animation: 'none',
				orientation: 'portrait',
			}}
		/>
	);
};

export default Layout;
