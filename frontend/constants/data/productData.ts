import { inventoryFieldsDefaults } from "./inventoryData";
import { ProductDetailsType, ProductType } from "@/store/useAddProduct";

export const productStateDefaults: ProductDetailsType = {
    baseDetail: {
        about: '',
        category: '',
        description: '',
        title: ''
    },
    inventory: inventoryFieldsDefaults,
    specifications: [],
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