package com.e_commerce.catalog.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import java.util.Map;

@Data
@Document("products")
public class Products {

    @Id
    private String id;

    private String title;

    private String category;

    private String description;

    private String aboutItem;

    private String coverImageURL;

    private Map<String, Object> metaDetails;

    private ProductStatus productStatus = ProductStatus.PENDING_REVIEW;

    private ProductMediaAssets assets;

}