import React from 'react';
import { Stack } from 'expo-router';
import NavigationLayout from 'src/layouts/NavigationLayout';

const Layout = () => {
	return (
		<NavigationLayout>
			<Stack
				screenOptions={{
					headerShown: false,
					orientation: 'portrait',
					animation: 'fade',
				}}
			/>
		</NavigationLayout>
	);
};

export default Layout;

