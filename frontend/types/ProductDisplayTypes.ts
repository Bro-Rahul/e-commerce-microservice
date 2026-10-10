import { InventoryFieldType } from "@/validators/inventoryValidator";
import { ProductBaseFieldsType } from "@/validators/ProductBaseFieldsValidator";
import { keyValuePairType } from "@/validators/specificationValidator";

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
    productInventory: InventoryFieldType,
    productBaseDetails: ProductBaseFieldsType,
    productMetaDetails: ProductMetaDetailsType,
    variantOptions: Record<string, keyValuePairType[]>
}