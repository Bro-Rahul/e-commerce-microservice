
import { ApiError, ApiErrorResponse } from "./apiError";
import { getDefaultErrorCode, getDefaultErrorMessage } from "./errorCode";

export async function apiFetch(
    url: string,
    options?: RequestInit
): Promise<Response> {

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


    if (!response.ok) {
        const data = await response.json();
        const errorData = data as Partial<ApiErrorResponse>;
        console.log(data)
        throw new ApiError({
            message:
                errorData?.message ??
                getDefaultErrorMessage(response.status),

            status: response.status,

            code:
                errorData?.code ??
                getDefaultErrorCode(response.status),

            errors: errorData?.errors,
        });
    }
    return response;
}
