"use client"
import { ProductAssetsResponseType } from '@/types/products/SellerProductListType'
import FormCard from '../../addProducts/productForms/FormCard'
import ImageCollection from '../../addProducts/mediaAssets/ImageCollection'
import { Images } from 'lucide-react'
import CoverImage from '../../addProducts/mediaAssets/CoverImage'
import ImageCarousel from '../../addProducts/mediaAssets/ImageCarousel'
import { baseURL } from '@/repositary/baseURL'

interface UpdateAssetsFormProps {
    productAssets: ProductAssetsResponseType
}

const UpdateAssetsForm = ({ productAssets }: UpdateAssetsFormProps) => {
    return (
        <FormCard
            Icon={Images}
            heading="Media assets"
            description="Add high-quality visuals that help customers understand the product."
        >
            <div className="space-y-8 p-5 sm:p-8">
                <CoverImage
                    onImageLoaded={(files) => { }}
                    image={baseURL.assetsBaseURL.concat(productAssets.coverImage)}
                />
                <ImageCarousel
                    onImageLoaded={(files) => { }}
                    images={productAssets.carouselImages.map(image => baseURL.assetsBaseURL.concat(image))}
                />
                <ImageCollection
                    onImageLoaded={(files) => { }}
                    images={productAssets.imageCollections.map(image => baseURL.assetsBaseURL.concat(image))}
                />
            </div>
        </FormCard>
    )
}

export default UpdateAssetsForm