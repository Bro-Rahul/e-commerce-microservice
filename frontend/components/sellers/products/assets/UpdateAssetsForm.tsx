"use client"
import { AssetsMetaDetails, ProductAssetsResponseType } from '@/types/products/SellerProductListType'
import FormCard from '../../addProducts/productForms/FormCard'
import ImageCollection from '../../addProducts/mediaAssets/ImageCollection'
import { Images } from 'lucide-react'
import CoverImage from '../../addProducts/mediaAssets/CoverImage'
import ImageCarousel from '../../addProducts/mediaAssets/ImageCarousel'
import { baseURL } from '@/repositary/baseURL'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ImagePlaceType } from '@/types/dexie/mediaAssetsTypes'
import { sellerRepository } from '@/repositary/seller/sellerHttp'
import toast from 'react-hot-toast'

interface UpdateAssetsFormProps {
    productAssets: ProductAssetsResponseType
    variantId: string
}

type ProductImageState = {
    [key in ImagePlaceType]: File[]
}

const UpdateAssetsForm = ({ variantId, productAssets }: UpdateAssetsFormProps) => {

    const [productImages, setProductImages] = useState<ProductImageState>({
        CoverImage: [],
        CarouselImages: [],
        CollectionImages: []
    });

    const handleImage = (key: keyof ProductImageState, files: File[]) => {
        setProductImages(pre => ({
            ...pre,
            [key]: files
        }))

    }
    const handleSubmit = async (key: keyof ProductImageState) => {
        const imageMeta: AssetsMetaDetails[] = [];
        const formData = new FormData();
        for (let i = 0; i < productImages[key].length; i++) {
            formData.append("images", productImages[key][i]);
            imageMeta.push({
                index: i,
                isCover: key === "CoverImage",
                type: key,
                name: productImages[key][i].name,
            })
        }
        formData.append("metaDetails", new Blob([
            JSON.stringify(imageMeta)
        ], {
            type: "application/json",
        }))
        try {
            await sellerRepository.patchRequests.patchProductVariantAssets(variantId, formData);
            toast.success(`${key} Updated!`, {
                position: "bottom-right",
                duration: 5000
            })
        } catch (err: any) {
            console.log(err);
            toast.error(err.message ?? "Can't update the images ", {
                position: "bottom-right",
                duration: 5000
            })
        }
    }
    return (
        <FormCard
            Icon={Images}
            heading="Media assets"
            description="Add high-quality visuals that help customers understand the product."
        >
            <div className="space-y-8 p-5 sm:p-8">
                <div className='flex flex-col w-full gap-5'>
                    <CoverImage
                        onImageLoaded={(files) => handleImage("CoverImage", files)}
                        image={productImages.CoverImage?.[0] ?? baseURL.assetsBaseURL.concat(productAssets.coverImage)}
                    />
                    <Button onClick={() => handleSubmit("CoverImage")} disabled={!productImages.CoverImage.length} className='w-fit self-end px-5 cursor-pointer'>Save Cover Image</Button>
                </div>
                <div className='flex flex-col w-full gap-5'>
                    <ImageCarousel
                        onImageLoaded={(files) => handleImage("CarouselImages", files)}
                        images={productImages.CarouselImages.length ? productImages.CarouselImages : productAssets.carouselImages.map(image => baseURL.assetsBaseURL.concat(image))}
                    />
                    <Button onClick={() => handleSubmit("CarouselImages")} disabled={!productImages.CarouselImages.length} className='w-fit self-end px-5 cursor-pointer'>Save Carousel Images</Button>
                </div>
                <div className='flex flex-col w-full gap-5'>
                    <ImageCollection
                        onImageLoaded={(files) => handleImage("CollectionImages", files)}
                        images={productImages.CollectionImages.length ? productImages.CollectionImages : productAssets.imageCollections.map(image => baseURL.assetsBaseURL.concat(image))}
                    />
                    <Button onClick={() => handleSubmit("CollectionImages")} disabled={!productImages.CollectionImages.length} className='w-fit self-end px-5 cursor-pointer'>Save Image Collection Images</Button>
                </div>
            </div>
        </FormCard>
    )
}

export default UpdateAssetsForm