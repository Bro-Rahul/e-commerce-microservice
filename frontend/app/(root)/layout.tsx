import Header from '@/components/utils/Header'
import React from 'react'

const layout = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default layout