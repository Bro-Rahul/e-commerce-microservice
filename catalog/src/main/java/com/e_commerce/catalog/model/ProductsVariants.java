package com.e_commerce.catalog.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Document("productVariants")
public class ProductsVariants {

    @Id
    private String variantId;

    private String productId;

    private String title;

    private String category;

    private Boolean isMainVariant;

    private LocalDateTime createdAt = LocalDateTime.now();

    private String description;

    private String aboutItem;

    private String coverImageURL;

    private Map<String, Object> metaDetails;

    private ProductStatus productStatus = ProductStatus.PENDING_REVIEW;

    private ProductMediaAssets assets;

}