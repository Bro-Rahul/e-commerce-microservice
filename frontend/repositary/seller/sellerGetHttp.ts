import { PaginatedResponse } from "@/types/paginatedResponseType";
import { ProductMetaDetailResponseType, ProductAssetsResponseType, ProductInventoryResponseType, HierarchyCategoryResponseType, SellerProductListingType } from "@/types/products/SellerProductListType";
import { ProductStatusType } from "@/types/searchFilter/sellerFilterTypes";
import { ProductBaseFieldsType } from "@/validators/ProductBaseFieldsValidator";
import { apiFetch } from "../api";
import { baseURL } from "../baseURL";

export const sellerGets = {

    async getCategoryList(): Promise<HierarchyCategoryResponseType[]> {
        const response = await apiFetch(`${baseURL.catalogBaseUrl}/seller/category`);
        return await response.json();
    },

    async getSellerProductList(filterString: string): Promise<PaginatedResponse<SellerProductListingType>> {
        const response = await apiFetch(`${baseURL.searchBaseUrl}/seller/products?${filterString}`);
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