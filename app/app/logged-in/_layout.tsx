import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { page } from 'src/constants/routes/app';
import { UserProvider } from 'src/contexts/UserContext';
import { DateProvider } from 'src/contexts/DateContext';

const Layout = () => {
    const { user, isSignedIn } = useUser();

    if (!user || !isSignedIn) {
        return <Redirect href={page.auth.authentication} />
    }

    return (
        <DateProvider>
            <UserProvider user={user}>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        orientation: 'portrait',
                        animation: 'fade',
                    }}
                />
            </UserProvider>
        </DateProvider>
    );
};

export default Layout;
