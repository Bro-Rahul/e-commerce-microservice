package com.e_commerce.inventory.dto.product;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {

    private String id;

    private String title;

    private String category;

    private String description;

    private String aboutItem;

    private String coverImageURL;

    private Map<String, Object> metaDetails;

    private String productStatus;

    private ProductMediaAssets assets;
}
