package com.e_commerce.search.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "products")
public class Products {

    @Id
    private String id;

    private String productId;

    private String variantId;

    private Boolean isMainVariant;

    private String title;

    @Field(type = FieldType.Keyword)
    private String category;

    private String description;

    private LocalDateTime createdAt;

    private String aboutItem;

    private String coverImageURL;

    @Field(type = FieldType.Nested)
    private Map<String, Object> metaDetails;

    @Field(type = FieldType.Keyword)
    private ProductStatus productStatus = ProductStatus.PENDING_REVIEW;

    private ProductMediaAssets assets;

    @Field(type = FieldType.Nested)
    private ProductInventory inventory;

    @Field(type = FieldType.Object)
    private Map<String,Object> variantInfo;
}
