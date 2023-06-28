import React from 'react';
import { Stack } from 'expo-router';
import NavigationLayout from 'src/layouts/NavigationLayout';
import { StepProvider } from 'src/contexts/StepContext';

const Layout = () => {
	return (
		<NavigationLayout>
			<StepProvider>
				<Stack
					screenOptions={{
						headerShown: false,
						orientation: 'portrait',
						animation: 'fade',
					}}
				/>
			</StepProvider>
		</NavigationLayout>
	);
};

export default Layout;

