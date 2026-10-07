import { LucideIcon } from 'lucide-react';
import React from 'react'

interface FormCardProps {
    children: React.ReactNode,
    Icon: LucideIcon
    heading: string,
    description?: string,
    headerActions?: React.ReactNode
}

const FormCard = ({ children, Icon, heading, description, headerActions }: FormCardProps) => {
    return (
        <section className="overflow-hidden rounded-xl border border-outline-variant bg-card shadow-sm">
            <div className="border-b border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-secondary p-2 text-on-secondary">
                            <Icon size={20} aria-hidden="true" />
                        </span>
                        <div>
                            <h2 className="headline-sm">{heading}</h2>
                            {description && <p className="mt-1 text-sm text-on-surface-variant">{description}</p>}
                        </div>
                    </div>

                    {headerActions && (
                        <div className="flex items-center gap-2">
                            {headerActions}
                        </div>
                    )}
                </div>
            </div>
            {children}
        </section>
    )
}

export default FormCard