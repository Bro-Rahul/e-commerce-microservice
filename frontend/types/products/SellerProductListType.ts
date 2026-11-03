import { InventoryFieldType } from "@/validators/inventoryValidator"
import { ImagePlaceType } from "../dexie/mediaAssetsTypes"
import { ProductStatusType } from "../searchFilter/sellerFilterTypes"


export interface SellerProductListingType {
    productCategories: string[],
    description: string,
    coverImageURL: string,
    inventory: {
        price: number,
        quantity: number,
        sku: string
    },
    productId: string,
    productStatus: ProductStatusType,
    title: string,
    variantId: string
}

export interface ProductMetaDetailResponseType {
    category: string,
    [k: string]: any
}

export interface ProductAssetsResponseType {
    carouselImages: string[],
    imageCollections: string[],
    coverImage: string
}

export interface AssetsMetaDetails {
    index: number,
    name: string,
    type: ImagePlaceType,
    isCover: boolean,
    variantId?: number
}

export type ProductInventoryResponseType = {
    variantId: string;
} & InventoryFieldType


export type HierarchyCategoryResponseType = {
    name: string,
    childCategories: HierarchyCategoryResponseType[]
}

export type CategoryNamesResponseType = {
    name: string
}