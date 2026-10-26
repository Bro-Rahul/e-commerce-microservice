import { AvailableCategoryType } from "../inventoryTypes"

export type ImagePlaceType = "CoverImage" | "CarouselImages" | "CollectionImages"


export type MediaAssetsType = {
    file: Blob,
    fileName: string,
    category: AvailableCategoryType,
    variantId: string,
    imageType: ImagePlaceType,
}