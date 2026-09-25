"use client"

import db from "@/lib/dexie/db"
import { BookAuthorTableType } from "@/types/dexie/bookAuthorTableType"
import { ImagePlaceType, MediaAssetsType } from "@/types/dexie/mediaAssetsTypes"

import { AvailableCategoryType } from "@/types/inventoryTypes"

const useDexie = () => {

    // Media assets table queries for cover,imagecollection and carousel images  
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


    // author profile 
    const addAuthorProfile = async (profile: BookAuthorTableType) => {
        await db.bookAuthor.clear()
        return await db.bookAuthor.add(profile)
    }

    const getAuthorProfile = async () => {
        return await db.bookAuthor.toCollection().first()
    }

    const deleteAuthorProfile = async (id: number) => {
        return await db.bookAuthor.delete(id);
    }

    return {
        addImages,
        addImage,
        getImageByCategory,
        getImageByCategoryAndPlace,
        addAuthorProfile,
        getAuthorProfile,
        deleteAuthorProfile,
    }
}

export default useDexie