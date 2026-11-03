
export type ImagePlaceType = "CoverImage" | "CarouselImages" | "CollectionImages"


export type MediaAssetsType = {
    file: Blob,
    fileName: string,
    category: string,
    variantId: string,
    imageType: ImagePlaceType,
}