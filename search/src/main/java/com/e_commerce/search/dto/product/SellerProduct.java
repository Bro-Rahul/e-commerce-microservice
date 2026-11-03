package com.e_commerce.search.dto.product;

import com.e_commerce.commons.dto.product.ProductStatus;
import lombok.Data;

import java.util.List;

@Data
public class SellerProduct {

    private String id;
    private String productId;
    private String variantId;
    private String title;
    private String description;
    private List<String> productCategories;
    private String coverImageURL;
    private ProductStatus productStatus;
    private InventoryProjection inventory;

    @Data
    public static class InventoryProjection {
        private Double price;
        private Integer quantity;
        private String sku;
    }
}
