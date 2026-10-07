import { AvailableCategoryType } from "../inventoryTypes"

export type ImagePlaceType = "CoverImage" | "Carousel" | "ImageCollection"


export type MediaAssetsType = {
    file: Blob,
    fileName: string,
    category: AvailableCategoryType,
    variantId: string,
    imageType: ImagePlaceType,
}