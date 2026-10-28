import { SellerProductListFilterType } from "@/types/searchFilter/sellerFilterTypes";
import { apiFetch } from "../api"
import { baseURL } from "../baseURL";
import { ProductAssetsResponseType, ProductInventoryResponseType, ProductMetaDetailResponseType, SellerProductListingType } from "@/types/products/SellerProductListType";
import { PaginatedResponse } from "@/types/paginatedResponseType";
import { ProductBaseFieldsType } from "@/validators/ProductBaseFieldsValidator";



export const sellerRepository = {
    async createProduct(payload: FormData): Promise<void> {
        await apiFetch(
            `${baseURL.catalogBaseUrl}/seller/product`, {
            body: payload,
            method: "POST"
        });
    },

    async getSellerProductList(filter: SellerProductListFilterType): Promise<PaginatedResponse<SellerProductListingType>> {
        const response = await apiFetch(`${baseURL.searchBaseUrl}/seller/products`, {
            method: "POST",
            body: JSON.stringify(filter),
            headers: {
                "Content-Type": "application/json"
            }
        });

        return await response.json();
    },

    async getProductVaraintBaseDetail(variantId: string): Promise<ProductBaseFieldsType> {
        const response = await apiFetch(`${baseURL.catalogBaseUrl}/seller/product-variant/${variantId}/base`,);
        return await response.json();
    },

    async getProductVariantMetaDetail(variantId: string): Promise<ProductMetaDetailResponseType> {
        const response = await apiFetch(`${baseURL.catalogBaseUrl}/seller/product-variant/${variantId}/meta-detail`,);
        return await response.json();
    },

    async getProductVariantAssets(variantId: string): Promise<ProductAssetsResponseType> {
        const response = await apiFetch(`${baseURL.catalogBaseUrl}/seller/product-variant/${variantId}/assets`,);
        return await response.json();
    },

    async getProductVariantInventory(variantId: string): Promise<ProductInventoryResponseType> {
        const response = await apiFetch(`${baseURL.inventoryBaseURL}/seller/stock/${variantId}`,);
        return await response.json();
    }
}   