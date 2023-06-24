import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { ClerkProvider } from '@clerk/clerk-expo';
import { CLERK_PUBLISHABLE_KEY, tokenCache } from 'src/utils/auth/clerk';

const queryClient = new QueryClient();

const Root = () => {
	return (
		<ClerkProvider
			publishableKey={CLERK_PUBLISHABLE_KEY}
			tokenCache={tokenCache}
		>
			<QueryClientProvider client={queryClient}>
				<Slot />
			</QueryClientProvider>
		</ClerkProvider>
	);
};

export default Root;
