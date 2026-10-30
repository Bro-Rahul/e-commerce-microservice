import { inventoryFields } from "@/constants/formFields/inventoryFields"
import { AvailableCategoryType } from "../inventoryTypes"
import { InventoryFieldType } from "@/validators/inventoryValidator"
import { ImagePlaceType } from "../dexie/mediaAssetsTypes"
import { ProductStatusType } from "../searchFilter/sellerFilterTypes"


export interface SellerProductListingType {
    category: string,
    description: string,
    coverImage: string,
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
    category: AvailableCategoryType,
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
