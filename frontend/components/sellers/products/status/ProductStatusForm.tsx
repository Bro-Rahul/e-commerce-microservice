'use client'

import { Button } from '@/components/ui/button'
import FormCard from '@/components/sellers/addProducts/productForms/FormCard'
import { formatStatus } from '@/lib/utils'
import { sellerRepository } from '@/repositary/seller/sellerHttp'
import { ProductStatusType } from '@/types/searchFilter/sellerFilterTypes'
import { BadgeCheck, Save } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const productStatuses: ProductStatusType[] = [
    'DRAFT',
    'PENDING_REVIEW',
    'ACTIVE',
    'INACTIVE',
    'OUT_OF_STOCK',
    'DISCONTINUED',
    'ARCHIVED',
]

const isProductStatus = (value: string): value is ProductStatusType =>
    productStatuses.some((productStatus) => productStatus === value)

interface ProductStatusFormProps {
    variantId: string
    productStatus: ProductStatusType
}

const ProductStatusForm = ({ variantId, productStatus }: ProductStatusFormProps) => {
    const [status, setStatus] = useState<string>(productStatus)
    const [isSaving, setIsSaving] = useState(false)

    const handleSubmit = async (event: React.SubmitEvent) => {
        event.preventDefault()
        if (!status || isSaving) return

        setIsSaving(true)
        try {
            await sellerRepository.patchRequests.patchProductVariantStatus(variantId, status as ProductStatusType)
            toast.success('Product status updated.', {
                duration: 5000,
                position: 'bottom-right',
            })
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Unable to update product status.', {
                duration: 5000,
                position: 'bottom-right',
            })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <FormCard
            Icon={BadgeCheck}
            heading="Product status"
            description="Choose the status you want to apply to this product."
        >
            <form onSubmit={handleSubmit}>
                <div className="max-w-xl p-5 sm:p-8">
                    <label className="mb-2 block text-sm font-semibold text-on-surface" htmlFor="product-status">
                        Status <span className="text-error">*</span>
                    </label>
                    <select
                        className="inputfields"
                        id="product-status"
                        onChange={(event) => {
                            const value = event.target.value
                            setStatus(isProductStatus(value) ? value : '')
                        }}
                        required
                        value={status}
                    >
                        <option value="" disabled>Select a product status</option>
                        {productStatuses.map((productStatus) => (
                            <option key={productStatus} value={productStatus}>
                                {formatStatus(productStatus)}
                            </option>
                        ))}
                    </select>
                    <p className="mt-2 text-xs text-muted-foreground">
                        The selected status will be applied when you save.
                    </p>
                </div>

                <div className="flex justify-end border-t border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
                    <Button disabled={!status || isSaving} type="submit" variant="outline">
                        <Save aria-hidden="true" />
                        {isSaving ? 'Saving...' : 'Save status'}
                    </Button>
                </div>
            </form>
        </FormCard>
    )
}

export default ProductStatusForm
