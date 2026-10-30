'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { BadgeCheck, Boxes, ClipboardList, Images, ListChecks } from 'lucide-react'

const productTabs = [
    { id: 'base', label: 'Product base details', icon: ClipboardList },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'assets', label: 'Assets', icon: Images },
    { id: 'other-details', label: 'Other details', icon: ListChecks },
    { id: 'product-status', label: 'Product status', icon: BadgeCheck },
] as const

interface ProductEditTabsProps {
    productId: string
}

const ProductEditTabs = ({ productId }: ProductEditTabsProps) => {
    const activeSegment = useSelectedLayoutSegment()

    return (
        <nav aria-label="Product sections" className="mb-6 border-b border-outline-variant lg:overflow-hidden max-sm:overflow-x-scroll">
            <div className="flex min-w-max gap-2">
                {productTabs.map(({ id, label, icon: Icon }) => {
                    const isActive = activeSegment === id

                    return (
                        <Link
                            key={id}
                            aria-current={isActive ? 'page' : undefined}
                            className={`inline-flex min-h-12 items-center gap-2 border-b-2 px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${isActive
                                ? 'border-secondary text-secondary'
                                : 'border-transparent text-muted-foreground hover:border-outline-variant hover:text-foreground'
                                }`}
                            href={`/seller/products/${encodeURIComponent(productId)}/${id}`}
                        >
                            <Icon aria-hidden="true" className="size-4" />
                            {label}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default ProductEditTabs
