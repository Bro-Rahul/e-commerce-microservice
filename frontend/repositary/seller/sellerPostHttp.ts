import { apiFetch } from "../api";
import { baseURL } from "../baseURL";

export const sellerPostHttp = {
    async createProduct(payload: FormData): Promise<void> {
        await apiFetch(
            `${baseURL.catalogBaseUrl}/seller/product`, {
            body: payload,
            method: "POST"
        });
    },
}