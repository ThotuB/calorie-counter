
import * as SecureStore from "expo-secure-store";

export const CLERK_PUBLISHABLE_KEY =
    'pk_test_aW50ZXJuYWwtdGhydXNoLTM1LmNsZXJrLmFjY291bnRzLmRldiQ';

export const tokenCache = {
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