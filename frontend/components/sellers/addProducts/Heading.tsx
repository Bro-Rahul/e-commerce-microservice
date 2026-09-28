import { LucideIcon } from 'lucide-react'
import React from 'react'

interface HeadingProps {
    Icon: LucideIcon
    children: React.ReactNode
}

const Heading: React.FC<HeadingProps> = ({ children, Icon }) => {
    return (
        <h1
            className="mb-8 flex items-start gap-3 border-b border-outline-variant pb-5">
            <span className="mt-0.5 rounded-xl bg-secondary p-2.5 text-on-secondary shadow-sm">
                <Icon size={24} strokeWidth={2.25} />
            </span>
            {children}
        </h1>
    )
}

export default Heading