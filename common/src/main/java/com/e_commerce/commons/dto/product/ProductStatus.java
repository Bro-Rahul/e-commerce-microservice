package com.e_commerce.commons.dto.product;

public enum ProductStatus {

    DRAFT, // Product is being created/edited
    PROCESSING, // Product is under creation inserting data in catalog,inventory and search service
    PENDING_REVIEW, // Waiting for admin/moderator approval
    ACTIVE, // Product is live and available for purchase
    INACTIVE, // Temporarily disabled/not visible
    OUT_OF_STOCK, // Product is live but inventory is 0
    DISCONTINUED, // Product will no longer be sold
    ARCHIVED // Removed from normal catalog but kept for records
}