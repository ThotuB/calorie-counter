import { Stack } from 'expo-router';

const Layout: React.FC = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				orientation: 'portrait',
			}}
		/>
	);
};

export default Layout;
