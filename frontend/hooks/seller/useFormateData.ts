import useAddProduct from "@/store/useAddProduct"
import { AvailableCategoryType } from "@/types/inventoryTypes"
import {
    ProductDataType,
    ProductDisplayImageType,
    ProductImageType,
} from "@/types/ProductDisplayTypes"
import useImageLoader from "./useImageLoader"

const useFormateData = (category: AvailableCategoryType) => {
    const product = useAddProduct(
        (state) => state.products[category]
    )

    const { images: coverImages } = useImageLoader(
        category,
        "CoverImage"
    )

    const { images: carouselImages } = useImageLoader(
        category,
        "Carousel"
    )

    const { images: imageCollection } = useImageLoader(
        category,
        "ImageCollection"
    )

    const getDisplayImage = (
        coverImage: File,
        imageCollections: File[]
    ): ProductDisplayImageType[] => {
        const images = [coverImage, ...imageCollections]

        return images.map((image, index) => ({
            imageURL: URL.createObjectURL(image),
            isCoverImage: index === 0,
            name: image.name,
        }))
    }

    /*
     * Carousel images
     */
    const getImageCarousel = (
        images: File[]
    ): ProductImageType[] => {
        return images.map((image) => ({
            imageURL: URL.createObjectURL(image),
            name: image.name,
        }))
    }

    /*
     * Cover image may not be available on first render
     */
    const coverImage = coverImages?.[0]

    const productDisplayData: ProductDataType = {
        mediaAssets: {
            imageCarousel: getImageCarousel(
                carouselImages ?? []
            ),

            productDisplay: coverImage
                ? getDisplayImage(
                    coverImage,
                    imageCollection ?? []
                )
                : [],
        },

        productBaseDetails: {
            ...product.baseDetail,
        },

        productInventory: product.inventory,

        productMetaDetails: {
            specifications: product.specifications,
            ...product.productMetaDetail
        },
    }

    return productDisplayData
}

export default useFormateData