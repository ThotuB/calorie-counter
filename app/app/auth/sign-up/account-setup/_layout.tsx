import React from 'react'
import CreateAccountLayout from 'src/layouts/CreateAccountLayout'
import { Slot } from 'expo-router'

const _layout = () => {
    return (
        <CreateAccountLayout>
            <Slot />
        </CreateAccountLayout>
    )
}

export default _layout