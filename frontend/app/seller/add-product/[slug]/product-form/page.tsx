import ProductBaseDetailForm from '@/components/sellers/addProducts/baseDetails/ProductBaseDetailForm'
import Heading from '@/components/sellers/addProducts/Heading'
import CoverImage from '@/components/sellers/addProducts/mediaAssets/CoverImage'
import ImageCarousel from '@/components/sellers/addProducts/mediaAssets/ImageCarousel'
import ImageCollection from '@/components/sellers/addProducts/mediaAssets/ImageCollection'
import SaveAssetsBtn from '@/components/sellers/addProducts/mediaAssets/SaveAssetsBtn'
import ProductSpecificForm from '@/components/sellers/addProducts/productForms/ProductSpecificAttributeForm'
import MainVariantCheckbox from '@/components/sellers/addProducts/MainVariantCheckbox'
import { AvailableCategoryType } from '@/types/inventoryTypes'
import { ClipboardList, Images, SquareText } from 'lucide-react'

interface ProductFormPageProps {
    params: Promise<{
        slug: AvailableCategoryType
    }>
}

const page = async ({ params }: ProductFormPageProps) => {
    const { slug } = await params

    return (
        <main className="mx-auto w-[80%] flex-1 px-4 pb-32 pt-6 sm:px-6 md:px-10 md:pt-10">
            <Heading Icon={ClipboardList}>
                <span className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <span>
                        <span className="headline-md block">Product form</span>
                        <span className="mt-1 block text-sm font-normal text-on-surface-variant">
                            Enter the details, images, and product-specific information.
                        </span>
                    </span>
                    <MainVariantCheckbox category={slug} />
                </span>
            </Heading>

            <div className="space-y-6">
                <ProductBaseDetailForm category={slug} advanceOnSave={false} />

                <section className="overflow-hidden rounded-xl border border-outline-variant bg-card shadow-sm">
                    <div className="border-b border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
                        <div className="flex items-center gap-3">
                            <span className="rounded-lg bg-secondary p-2 text-on-secondary">
                                <Images size={20} aria-hidden="true" />
                            </span>
                            <h2 className="headline-sm">Media assets</h2>
                        </div>
                    </div>
                    <div className="space-y-8 p-5 sm:p-8">
                        <CoverImage category={slug} />
                        <ImageCarousel category={slug} />
                        <ImageCollection category={slug} />
                    </div>
                    <SaveAssetsBtn slug={slug} advanceOnSave={false} />
                </section>

                <ProductSpecificForm category={slug} />
            </div>
        </main>
    )
}

export default page