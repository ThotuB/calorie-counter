import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				orientation: 'portrait',
				animation: 'slide_from_right',
			}}
		/>
	);
};

export default Layout;
