package com.e_commerce.catalog.model;

import com.e_commerce.commons.dto.product.ProductMediaAssets;
import com.e_commerce.commons.dto.product.ProductStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Entity
public class ProductsVariants {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String variantId;

    private String productId;

    private String title;

    private String category;

    private Boolean isMainVariant;

    private LocalDateTime createdAt = LocalDateTime.now();

    private String description;

    private String about;

    private String coverImageURL;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private Map<String, Object> metaDetails;

    private ProductStatus productStatus = ProductStatus.PROCESSING;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private ProductMediaAssets assets;

}