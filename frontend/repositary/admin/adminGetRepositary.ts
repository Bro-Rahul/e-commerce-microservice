import { CategoryNamesResponseType, HierarchyCategoryResponseType, } from "@/types/products/SellerProductListType";
import { apiFetch } from "../api";
import { baseURL } from "../baseURL";

export const adminGetRepositary = {
    async getHierarchyCategories(): Promise<HierarchyCategoryResponseType[]> {
        const response = await apiFetch(`${baseURL.catalogBaseUrl}/admin/category`);
        return await response.json();
    },
    async getCategeoryNames(): Promise<CategoryNamesResponseType[]> {
        const response = await apiFetch(`${baseURL.catalogBaseUrl}/admin/category/names`);
        return await response.json();
    }
}