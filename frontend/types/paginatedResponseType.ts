
export interface PaginatedResponse<T> {
    content: T[];
    isFirst: boolean;
    isLast: boolean;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}
