import React from 'react'

const For: React.FC<{
    times: number
    item: React.ReactNode
}> = ({ times, item }) => {
    return (
        <>
            {Array.from({ length: times }).map((_, idx) => (
                <React.Fragment key={idx}>
                    {item}
                </React.Fragment>
            ))}
        </>
    )
}

export default For