"use client"
import useAddProduct from '@/store/useAddProduct'
import { AvailableCategoryType } from '@/types/inventoryTypes'
import FormCard from '../productForms/FormCard'
import { Images } from 'lucide-react'
import CoverImage from './CoverImage'
import ImageCarousel from './ImageCarousel'
import ImageCollection from './ImageCollection'
import SaveAssetsBtn from './SaveAssetsBtn'

const AssetsForm = ({ category }: { category: AvailableCategoryType }) => {
    const { currentVariant } = useAddProduct((state) => state.products[category])
    return (
        <FormCard
            Icon={Images}
            heading="Media assets"
            description="Add high-quality visuals that help customers understand the product."
        >
            <div className="space-y-8 p-5 sm:p-8">
                <CoverImage
                    category={category}
                    variantId={currentVariant}
                />
                <ImageCarousel
                    category={category}
                    variantId={currentVariant}
                />
                <ImageCollection
                    category={category}
                    variantId={currentVariant}
                />
            </div>
            <SaveAssetsBtn
                slug={category}
                advanceOnSave={false}
                variantId={currentVariant}
            />
        </FormCard>
    )
}

export default AssetsForm