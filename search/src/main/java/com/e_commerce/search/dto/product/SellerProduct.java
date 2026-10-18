package com.e_commerce.search.dto.product;

import com.e_commerce.search.model.ProductStatus;
import lombok.Data;

@Data
public class SellerProduct {

    private String id;
    private String productId;
    private String variantId;
    private String title;
    private String description;
    private String category;
    private String coverImage;
    private ProductStatus productStatus;
    private InventoryProjection inventory;

    @Data
    public static class InventoryProjection {
        private Double price;
        private Integer quantity;
        private String sku;
    }
}
