'use client'
import { Button } from '@/components/ui/button'
import ProductRenderer from '@/components/sellers/addProducts/productDisplay/products/ProductRenderer'
import useFormateData from '@/hooks/seller/useFormateData'
import { AvailableCategoryType } from '@/types/inventoryTypes'
import { LoaderCircle, Upload, Variable } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { use, useState } from 'react'

interface ProductDisplayProps {
    params: Promise<{
        slug: AvailableCategoryType,
        productId: string
    }>
}
const page = ({ params }: ProductDisplayProps) => {
    const { slug, productId } = use(params);

    const { getProductVariantsData, getProductData } = useFormateData(slug)
    const { data: session } = useSession()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async () => {
        // if (!session?.user?.token) {
        //     toast.error('Please sign in before submitting this product.')
        //     return
        // }

        // setIsSubmitting(true)

        // try {

        //     const productData = getProductSubmissionData();
        //     await createProduct(productData);
        //     toast.success('Product submitted successfully.')
        // } catch (error) {
        //     toast.error(error instanceof Error ? error.message : 'Unable to submit this product.')
        // } finally {
        //     setIsSubmitting(false)
        // }
    }

    const productData = getProductData();

    return (
        <main className="mx-auto w-full max-w-7xl">
            <ProductRenderer
                category={slug}
                productData={productData[productId]}
                variantsData={getProductVariantsData()}
                currentVariant={productId}
            />
            <div className="flex w-full justify-end px-3 pb-6 md:px-6">
                <Button className='w-full' type="button" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting
                        ? <LoaderCircle className="animate-spin" aria-hidden="true" />
                        : <Upload aria-hidden="true" />}
                    {isSubmitting ? 'Submitting...' : 'Submit product'}
                </Button>
            </div>
        </main>
    )
}

export default page