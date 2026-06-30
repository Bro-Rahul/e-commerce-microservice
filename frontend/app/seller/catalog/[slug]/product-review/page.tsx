"use client"
import BreadCrumbList from '@/components/seller/reviewAndSubmit/breadCrumbList'
import ProductRenderer from '@/components/seller/reviewAndSubmit/ProductRenderer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import useProductRequestData from '@/hooks/useProductRequestData'
import useAddProduct from '@/store/useAddProduct'
import { AvailableCategory } from '@/types/seller'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface ProductReviewPageProps {
    params: Promise<{
        slug: AvailableCategory
    }>
}

const ProductReviewPage = () => {
    const { slug } = useParams<{ slug: AvailableCategory }>();
    const { getProductRequestValidator } = useProductRequestData(slug);
    const data = useAddProduct((state) => state.products)

    const onClick = async () => {
        const body = getProductRequestValidator();

        await fetch("http://localhost:8081/catalog/create-product/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    }

    return (
        <main className="flex-1 min-w-0">
            <div className="max-w-container-max mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className='flex flex-col w-full gap-2'>
                        <BreadCrumbList breadCrumbList={[
                            {
                                href: "/seller/catalog/",
                                name: "Catalog"
                            },
                            {
                                href: `/seller/catalog/${slug}/`,
                                name: "Add Product"
                            },
                            {
                                href: "#",
                                name: "Review & Submit"
                            }
                        ]} />
                        <div className="flex items-center gap-3">
                            <SectionHeading title='Review Your Listing' />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href={`/seller/catalog/${slug}`}>
                            <Button
                                className="bg-white border border-outline-variant hover:bg-surface-container-high text-on-surface px-6 py-2 rounded-lg font-medium transition-all font-body-md text-body-md">
                                Back to Edit
                            </Button>
                        </Link>
                        <Button
                            onClick={onClick}
                            className="bg-secondary-container text-on-secondary-container hover:bg-[#E68A00] px-8 py-2 rounded-lg font-bold transition-all shadow-sm font-body-md text-body-md">
                            Submit Listing
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1">

                    <div className="xl:col-span-8 space-y-gutter">

                        <ProductRenderer category={slug} productData={data} />
                    </div>

                </div>
            </div>
        </main>)
}

export default ProductReviewPage