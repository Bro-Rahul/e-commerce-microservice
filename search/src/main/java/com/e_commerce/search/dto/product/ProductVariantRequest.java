package com.e_commerce.search.dto.product;

import java.time.LocalDateTime;
import java.util.Map;

import com.e_commerce.commons.dto.product.ProductMediaAssets;
import com.e_commerce.commons.dto.product.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductVariantRequest {

    private String productId;

    private String variantId;

    private String title;

    private String category;

    private Boolean isMainVariant;

    private LocalDateTime createdAt;

    private String description;

    private String aboutItem;

    private String coverImageURL;

    private Map<String, Object> metaDetails;

    private ProductStatus productStatus;

    private ProductMediaAssets assets;
}
