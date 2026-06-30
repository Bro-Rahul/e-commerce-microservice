import React from 'react'

const SectionHeading = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <h2 className="mb-6 flex items-center gap-2 border-b border-outline-variant pb-3 text-lg font-bold text-on-surface w-full">{children}</h2>
    )
}

export default SectionHeading