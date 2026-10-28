package com.e_commerce.commons.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Variant {

    private String variantId;

    private String productId;

    private String userId;

    private String title;

    private String category;

    private Boolean isMainVariant;

    private LocalDateTime createdAt;

    private String description;

    private String about;

    private String coverImageURL;

    private Map<String, Object> metaDetails;

    private ProductStatus productStatus;

    private ProductMediaAssets assets;

}
