"use client"

import db from "@/lib/dexie/db"
import {
    ImagePlaceType,
    MediaAssetsType,
} from "@/types/mediaAssetsTypes"
import { AvailableCategoryType } from "@/types/inventoryTypes"

const useDexie = () => {

    const addImages = async (images: MediaAssetsType[], category: AvailableCategoryType, imageType: ImagePlaceType) => {
        await db.mediaAssets
            .where("[category+imageType]")
            .equals([category, imageType])
            .delete()

        await db.mediaAssets.bulkAdd(images)
    }

    const addImage = async (image: MediaAssetsType, category: AvailableCategoryType, imageType: ImagePlaceType) => {
        await db.mediaAssets
            .where("[category+imageType]")
            .equals([category, imageType])
            .delete()

        await db.mediaAssets.add(image)
    }


    const getImageByCategoryAndPlace = async (
        category: AvailableCategoryType,
        imagePlace: ImagePlaceType
    ) => {
        return await db.mediaAssets
            .where("[category+imageType]")
            .equals([category, imagePlace])
            .toArray()
    }

    const getImageByCategory = async (
        category: AvailableCategoryType
    ) => {
        return await db.mediaAssets
            .where("category")
            .equals(category)
            .toArray()
    }

    return {
        addImages,
        addImage,
        getImageByCategory,
        getImageByCategoryAndPlace,
    }
}

export default useDexie