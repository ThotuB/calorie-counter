import React from 'react'

const Show: React.FC<{
    when: boolean
    fallback?: React.ReactNode
    children: React.ReactNode
}>

    = ({ when, fallback = null, children }) => {
        return (
            <>
                {when ? children : fallback}
            </>
        )
    }

export default Show