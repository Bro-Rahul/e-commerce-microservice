import { PaginatedResponse } from "@/types/paginatedResponseType";
import { SellerProductListingType, ProductMetaDetailResponseType, ProductAssetsResponseType, ProductInventoryResponseType } from "@/types/products/SellerProductListType";
import { ProductStatusType, SellerProductListFilterType } from "@/types/searchFilter/sellerFilterTypes";
import { ProductBaseFieldsType } from "@/validators/ProductBaseFieldsValidator";
import { apiFetch } from "../api";
import { baseURL } from "../baseURL";

export const sellerGets = {
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

    async getProductVariantBaseDetail(variantId: string): Promise<ProductBaseFieldsType> {
        const response = await apiFetch(`${baseURL.catalogBaseUrl}/seller/product-variant/${variantId}/base`,);
        return await response.json();
    },

    async getProductVariantStatus(variantId: string): Promise<{ status: ProductStatusType }> {
        const response = await apiFetch(`${baseURL.catalogBaseUrl}/seller/product-variant/${variantId}/status`,);
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