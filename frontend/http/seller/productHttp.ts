import { apiFetch } from "../authHelper"
import baseURL from "../baseURL"

const catalogServiceURL = "http://localhost:8080"

const catalogPrefix = "/catalog"

const catalogURL = baseURL ? `${baseURL}${catalogPrefix}` : `${catalogServiceURL}${catalogPrefix}`



export const createProduct = (payload: FormData) => {

    return apiFetch(`${catalogURL}/seller/products`, {
        body: payload,
        method: "POST"
    });
}