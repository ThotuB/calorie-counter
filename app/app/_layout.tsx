import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { ClerkProvider } from '@clerk/clerk-expo';
import { MealProvider } from 'src/contexts/MealContext';

const CLERK_PUBLISHABLE_KEY =
	'pk_test_aW50ZXJuYWwtdGhydXNoLTM1LmNsZXJrLmFjY291bnRzLmRldiQ';

const queryClient = new QueryClient();

const Root = () => {
	return (
		<ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
			<QueryClientProvider client={queryClient}>
				<MealProvider>
					<Slot />
				</MealProvider>
			</QueryClientProvider>
		</ClerkProvider>
	);
};

export default Root;
