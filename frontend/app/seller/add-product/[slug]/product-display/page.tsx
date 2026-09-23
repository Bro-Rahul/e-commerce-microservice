'use client'
import ProductRenderer from '@/components/sellers/addProducts/productDisplay/products/ProductRenderer'
import useFormateData from '@/hooks/seller/useFormateData'
import { AvailableCategoryType } from '@/types/inventoryTypes'
import { use, useMemo } from 'react'


interface ProductDisplayProps {
    params: Promise<{
        slug: AvailableCategoryType
    }>
}
const page = ({ params }: ProductDisplayProps) => {
    const { slug } = use(params);
    const data = useFormateData(slug)
    return (
        <ProductRenderer category={slug} productData={data} />
    )
}

export default page