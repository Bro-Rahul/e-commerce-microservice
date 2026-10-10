import { AvailableCategoryType } from "@/types/inventoryTypes";
import { inventoryFieldsDefaults } from "./inventoryData";
import { ProductDetailsType, ProductType } from "@/store/useAddProduct";
import { bookVariantKeyOptions } from "./bookData";
import { phoneVariantKeyOptions } from "./phoneData";

export const productStateDefaults: ProductDetailsType = {
    baseDetail: {
        about: '',
        category: '',
        description: '',
        title: ''
    },
    inventory: inventoryFieldsDefaults,
    productMetaDetail: {}
}


export const getProductsDefaults = (): ProductType => {
    const randomUUID = crypto.randomUUID();
    const productData: ProductType = {
        book: {
            variants: {
                [randomUUID]: productStateDefaults
            },
            currentVariant: randomUUID,
            mainVariant: randomUUID,
            variantKeys: [randomUUID]
        },
        phone: {
            variants: {
                [randomUUID]: productStateDefaults
            },
            currentVariant: randomUUID,
            mainVariant: randomUUID,
            variantKeys: [randomUUID]
        }
    };
    return productData;
}

export const productVariantsOptions: {
    [k in AvailableCategoryType]: string[]
} = {
    "book": bookVariantKeyOptions,
    "phone": phoneVariantKeyOptions
}