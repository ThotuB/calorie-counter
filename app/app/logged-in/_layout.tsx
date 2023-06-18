import React from 'react';
import { Redirect, Slot } from 'expo-router';
import { MealProvider } from 'src/contexts/MealContext';
import { useUser } from '@clerk/clerk-expo';
import { page } from 'src/constants/routes/app';
import { UserProvider } from 'src/contexts/UserContext';

const Root = () => {
    const { user } = useUser();

    console.log('user', user && user.id);

    if (!user) {
        return <Redirect href={page.auth.authentication} />
    }

    return (
        <MealProvider userId={user.id}>
            <UserProvider user={user}>
                <Slot />
            </UserProvider>
        </MealProvider>
    );
};

export default Root;
