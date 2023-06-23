import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";

const CLERK_PUBLISHABLE_KEY =
	'pk_test_aW50ZXJuYWwtdGhydXNoLTM1LmNsZXJrLmFjY291bnRzLmRldiQ';

const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch (e) {
			console.log(e);
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (e) {
			console.log(e);
		}
	}
}

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
