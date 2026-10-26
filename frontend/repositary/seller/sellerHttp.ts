import { SellerProductListFilterType } from "@/types/searchFilter/sellerFilterTypes";
import { apiFetch } from "../api"
import { baseURL } from "../baseURL";
import { SellerProductListingType } from "@/types/products/SellerProductListType";
import { PaginatedResponse } from "@/types/paginatedResponseType";



export const sellerRepository = {
    async createProduct(payload: FormData): Promise<void> {
        return await apiFetch(`${baseURL.catalogBaseUrl}/seller/product`, {
            body: payload,
            method: "POST"
        });
    },

    async getSellerProductList(filter: SellerProductListFilterType): Promise<PaginatedResponse<SellerProductListingType>> {
        return await apiFetch(`${baseURL.searchBaseUrl}/seller/products`, {
            method: "POST",
            body: JSON.stringify(filter),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}   