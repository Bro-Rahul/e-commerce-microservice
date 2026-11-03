import { inventoryFieldsDefaults } from "./inventoryData";
import { ProductDetailsType, ProductType, ProductVariantsType } from "@/store/useAddProduct";
import { bookVariantKeyOptions } from "./bookData";
import { phoneVariantKeyOptions } from "./phoneData";

export const productStateDefaults: ProductDetailsType = {
    baseDetail: {
        about: '',
        category: '',
        description: '',
        title: ''
    },
    isMainVariant: false,
    inventory: inventoryFieldsDefaults,
    productMetaDetail: {}
}


export const getProductsDefaults = (category: string): ProductVariantsType => {
    const randomUUID = crypto.randomUUID();
    return {
        variants: {
            [randomUUID]: productStateDefaults
        },
        currentVariant: randomUUID,
        mainVariant: randomUUID,
        variantKeys: [randomUUID]
    }
}

export const productVariantsOptions: {
    [k: string]: string[]
} = {
    "books": bookVariantKeyOptions,
    "phones": phoneVariantKeyOptions
}