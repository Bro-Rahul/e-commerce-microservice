
import { ApiError, ApiErrorResponse } from "./apiError";
import { getDefaultErrorCode, getDefaultErrorMessage } from "./errorCode";

export async function apiFetch<T>(
    url: string,
    options?: RequestInit
): Promise<T> {

    let response: Response;

    try {
        response = await fetch(url, {
            ...options,
        });
    } catch (error) {

        throw new ApiError({
            message: "Unable to connect to the server",
            status: 0,
            code: "NETWORK_ERROR",
            data: error,
        });
    }

    const data = await response.json();


    if (!response.ok) {

        const errorData = data as Partial<ApiErrorResponse>;

        throw new ApiError({
            message:
                errorData?.message ??
                getDefaultErrorMessage(response.status),

            status: response.status,

            code:
                errorData?.code ??
                getDefaultErrorCode(response.status),

            errors: errorData?.errors,
            data,
        });
    }
    return data as T;
}
