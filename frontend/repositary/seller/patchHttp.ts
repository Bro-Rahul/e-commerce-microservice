import { ProductBaseFieldsType } from "@/validators/ProductBaseFieldsValidator";
import { apiFetch } from "../api";
import { baseURL } from "../baseURL";
import { ProductMetaDetailsType } from "@/types/ProductDisplayTypes";
import { ProductStatusType } from "@/types/searchFilter/sellerFilterTypes";
import { InventoryFieldType } from "@/validators/inventoryValidator";


export const sellerPatchHttp = {

    async patchProductVariantBaseDetail(variantId: string, payload: ProductBaseFieldsType): Promise<void> {
        await apiFetch(`${baseURL.catalogBaseUrl}/seller/product-variant/${variantId}/base`, {
            method: "PATCH",
            body: JSON.stringify(payload),
            headers: {
                "content-type": "application/json"
            }
        });

    },

    async patchProductVariantMetaDetail(variantId: string, payload: ProductMetaDetailsType): Promise<void> {
        await apiFetch(`${baseURL.catalogBaseUrl}/seller/product-variant/${variantId}/meta-detail`, {
            method: "PATCH",
            body: JSON.stringify(payload),
            headers: {
                "content-type": "application/json"
            }
        });
    },

    async patchProductVariantAssets(variantId: string, payload: FormData): Promise<void> {
        await apiFetch(`${baseURL.catalogBaseUrl}/seller/product-variant/${variantId}/assets`, {
            method: "PATCH",
            body: payload,

        });
    },

    async patchProductVariantInventory(variantId: string, payload: InventoryFieldType): Promise<void> {
        await apiFetch(`${baseURL.inventoryBaseURL}/seller/stock/${variantId}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
            headers: {
                "content-type": "application/json"
            }
        });
    },

    async patchProductVariantStatus(variantId: string, status: ProductStatusType): Promise<void> {
        await apiFetch(`${baseURL.catalogBaseUrl}/seller/product-variant/${variantId}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
            headers: {
                "content-type": "application/json"
            }
        });
    }
}