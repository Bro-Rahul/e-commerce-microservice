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