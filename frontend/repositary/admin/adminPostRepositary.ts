import { CreateCategoryType } from "@/validators/category/categoryValidators";
import { apiFetch } from "../api";
import { baseURL } from "../baseURL";

export const adminPostRepositary = {

    async createNewCategory(payload: CreateCategoryType) {
        await apiFetch(`${baseURL.catalogBaseUrl}/admin/category`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "content-type": "application/json"
            }
        });
    }
}