export type ProductStatusType = "DRAFT" | "PENDING_REVIEW" | "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK" | "DISCONTINUED" | "ARCHIVED"

export type SellerProductListFilterType = {
    category: string | null,
    createdAt: string | null,
    status: string | null,
    productSearch: string | null,
    page: string,
    pageSize: string;
}