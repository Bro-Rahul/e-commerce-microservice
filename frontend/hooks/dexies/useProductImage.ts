import db from '@/lib/dexie/db'
import { MediaAssetsType, ImagePlaceType } from '@/types/dexie/mediaAssetsTypes'

const useProductImage = () => {
    const addImages = async (
        images: MediaAssetsType[],
        category: string,
        imageType: ImagePlaceType,
        variantId: string,

    ) => {
        await db.mediaAssets
            .where("[category+imageType+variantId]")
            .equals([category, imageType, variantId])
            .delete()

        await db.mediaAssets.bulkAdd(images)
    }

    const addImage = async (
        image: MediaAssetsType,
        category: string,
        imageType: ImagePlaceType,
        variantId: string
    ) => {
        await db.mediaAssets
            .where("[category+imageType+variantId]")
            .equals([category, imageType, variantId])
            .delete()

        await db.mediaAssets.add(image)
    }

    const getImage = async (
        category: string,
        imageType: ImagePlaceType,
        variantId: string
    ) => {
        return await db.mediaAssets
            .where(["category+imageType+variantId"])
            .equals([category, imageType, variantId])
            .first();
    }

    const getImages = async (
        category: string,
        imageType: ImagePlaceType,
        variantId: string
    ) => {
        return await db.mediaAssets
            .where(["category+imageType+variantId"])
            .equals([category, imageType, variantId])
            .toArray();
    }

    const addCoverImage = async (
        image: MediaAssetsType,
        category: string,
        variantId: string
    ) => {
        addImage(image, category, "CoverImage", variantId)
    }

    const addCarouselImages = async (
        images: MediaAssetsType[],
        category: string,
        variantId: string,
    ) => {
        addImages(images, category, "CarouselImages", variantId)
    }

    const addImageCollection = async (
        images: MediaAssetsType[],
        category: string,
        variantId: string,
    ) => {
        addImages(images, category, "CollectionImages", variantId)
    }

    const getVariantImagesForAnCategory = async (
        variantId: string,
        category: string
    ) => {
        const images = await db.mediaAssets
            .where(["category+variantId"])
            .equals([category, variantId])
            .toArray();
        return images;
    }

    const getImageByCategory = async (
        category: string
    ) => {
        const images = await db.mediaAssets
            .where("category")
            .equals(category)
            .toArray();
        return images;
    }

    const deleteVariantImages = async (
        variantId: string,
        category: string
    ) => {
        const images = await db.mediaAssets
            .where(["category+variantId"])
            .equals([category, variantId])
            .delete();
    }


    return {
        addCoverImage,
        addCarouselImages,
        addImageCollection,
        getImage,
        getImages,
        getVariantImagesForAnCategory,
        deleteVariantImages,
        getImageByCategory
    }
}

export default useProductImage