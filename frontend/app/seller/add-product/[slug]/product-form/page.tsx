import ProductBaseDetailForm from '@/components/sellers/addProducts/baseDetails/ProductBaseDetailForm'
import Heading from '@/components/sellers/addProducts/Heading'
import ProductSpecificForm from '@/components/sellers/addProducts/productForms/ProductSpecificAttributeForm'
import MainVariantCheckbox from '@/components/sellers/addProducts/MainVariantCheckbox'
import { AvailableCategoryType } from '@/types/inventoryTypes'
import { ClipboardList, Images } from 'lucide-react'
import AssetsForm from '@/components/sellers/addProducts/mediaAssets/AssetsForm'

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
                <AssetsForm category={slug} />
                <ProductSpecificForm category={slug} />
            </div>
        </main>
    )
}

export default page