package com.e_commerce.search.model;

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

    private String title;

    private String category;

    private String description;

    private String aboutItem;

    private String coverImageURL;

    @Field(type = FieldType.Nested)
    private Map<String, Object> metaDetails;

    private ProductStatus productStatus = ProductStatus.PENDING_REVIEW;

    private ProductMediaAssets assets;

    private List<ProductInventory> inventory;

}
