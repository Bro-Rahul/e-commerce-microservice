import { SellerProductListFilterType } from "@/types/searchFilter/sellerFilterTypes";
import { apiFetch } from "../api"
import { baseURL } from "../baseURL";
import { SellerProductListingType } from "@/types/products/SellerProductListType";
import { PaginatedResponse } from "@/types/paginatedResponseType";



export const createProduct = (payload: FormData) => {

    return apiFetch(`${baseURL.catalogBaseUrl}/seller/products`, {
        body: payload,
        method: "POST"
    });
}


export const sellerRepository = {
    async createProduct(payload: FormData) {
        return await apiFetch(`${baseURL.catalogBaseUrl}/seller/products`, {
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