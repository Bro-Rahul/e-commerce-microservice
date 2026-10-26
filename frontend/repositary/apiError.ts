export type ApiErrorResponse = {
    success: false;
    message: string;
    code?: string;
    errors?: Record<string, string>;
};

export class ApiError extends Error {
    status: number;
    code?: string;
    errors?: Record<string, string>;
    data?: unknown;

    constructor({
        message,
        status,
        code,
        errors,
        data,
    }: {
        message: string;
        status: number;
        code?: string;
        errors?: Record<string, string>;
        data?: unknown;
    }) {
        super(message);

        this.name = "ApiError";
        this.status = status;
        this.code = code;
        this.errors = errors;
        this.data = data;
    }
}