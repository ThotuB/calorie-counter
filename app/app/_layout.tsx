import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { ClerkProvider } from '@clerk/clerk-expo';

const CLERK_PUBLISHABLE_KEY =
	'pk_test_aW50ZXJuYWwtdGhydXNoLTM1LmNsZXJrLmFjY291bnRzLmRldiQ';

const queryClient = new QueryClient();

const Root = () => {
	return (
		<ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
			<QueryClientProvider client={queryClient}>
				<Slot />
			</QueryClientProvider>
		</ClerkProvider>
	);
};

export default Root;
