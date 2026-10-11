'use client'
import ProductRenderer from '@/components/sellers/addProducts/productDisplay/products/ProductRenderer'
import useFormateData from '@/hooks/seller/useFormateData'
import { AvailableCategoryType } from '@/types/inventoryTypes'
import { use } from 'react'

interface ProductDisplayProps {
    params: Promise<{
        slug: AvailableCategoryType,
        productId: string
    }>
}
const page = ({ params }: ProductDisplayProps) => {
    const { slug, productId } = use(params);

    const { getProductVariantsData, getProductData } = useFormateData({ category: slug })
    const productData = getProductData();

    return (
        <main className="mx-auto w-full max-w-7xl">
            <ProductRenderer
                category={slug}
                productData={productData[productId]}
                variantsData={getProductVariantsData()}
                currentVariant={productId}
            />
            {/* <SubmitProductBtn category={slug} /> */}
        </main>
    )
}

export default page