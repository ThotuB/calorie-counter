import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';

const index = () => {
    const { user } = useUser();

    return (
        <View>
            <Text>index</Text>
        </View>
    )
}

export default index