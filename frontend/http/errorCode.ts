
export function getDefaultErrorMessage(status: number): string {
    switch (status) {
        case 400:
            return "Invalid request";

        case 401:
            return "Authentication required";

        case 403:
            return "You don't have permission to perform this action";

        case 404:
            return "Resource not found";

        case 409:
            return "This resource already exists";

        case 422:
            return "Validation failed";

        case 429:
            return "Too many requests. Please try again later";

        case 500:
            return "Internal server error";

        case 502:
            return "Bad gateway";

        case 503:
            return "Service temporarily unavailable";

        default:
            return "Something went wrong";
    }
}

export function getDefaultErrorCode(status: number): string {
    switch (status) {
        case 400:
            return "BAD_REQUEST";

        case 401:
            return "UNAUTHORIZED";

        case 403:
            return "FORBIDDEN";

        case 404:
            return "NOT_FOUND";

        case 409:
            return "CONFLICT";

        case 422:
            return "VALIDATION_ERROR";

        case 429:
            return "TOO_MANY_REQUESTS";

        case 500:
            return "INTERNAL_SERVER_ERROR";

        case 502:
            return "BAD_GATEWAY";

        case 503:
            return "SERVICE_UNAVAILABLE";

        default:
            return "UNKNOWN_ERROR";
    }
}