package com.e_commerce.catalog.dto.product;

import java.util.Map;

import com.e_commerce.catalog.dto.inventory.ProductInventoryRequest;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductCreationRequest {

    private ProductBaseDetail baseDetail;

    private ProductInventoryRequest inventory;

    @JsonProperty("isMainVariant")
    private Boolean isMainVariant;

    private Map<String, Object> productMetaDetail;

}
