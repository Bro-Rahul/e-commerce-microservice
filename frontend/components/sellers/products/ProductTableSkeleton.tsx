import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ProductTableSkeleton = () => {
    return (
        <tr aria-hidden="true">
            <td className="px-4 py-5"><Skeleton className="size-4" /></td>
            <td className="px-3 py-5"><Skeleton className="h-4 w-48" /></td>
            <td className="px-3 py-5"><Skeleton className="h-4 w-20" /></td>
            <td className="px-3 py-5"><Skeleton className="h-5 w-24" /></td>
            <td className="px-3 py-5"><Skeleton className="h-4 w-16" /></td>
            <td className="px-3 py-5"><Skeleton className="h-4 w-32" /></td>
            <td className="px-3 py-5"><Skeleton className="h-5 w-24" /></td>
        </tr>
    )
}

export default ProductTableSkeleton