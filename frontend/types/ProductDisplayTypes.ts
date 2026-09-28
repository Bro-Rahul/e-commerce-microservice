import { AvailableInventoryType } from "@/validators/inventoryValidator";
import { ProductBaseFieldsType } from "@/validators/ProductBaseFieldsValidator";

export type ProductImageType = {
    imageURL: string,
    name: string
}

export type ProductMetaDetailsType = {
    [k: string]: any
}

export type ProductDisplayImageType = {
    isCoverImage: boolean,
} & ProductImageType;

export interface ProductDataType {
    mediaAssets: {
        productDisplay: ProductDisplayImageType[],
        imageCarousel: ProductImageType[],
    },
    productInventory: AvailableInventoryType[],
    productBaseDetails: ProductBaseFieldsType,
    productMetaDetails: ProductMetaDetailsType
}
