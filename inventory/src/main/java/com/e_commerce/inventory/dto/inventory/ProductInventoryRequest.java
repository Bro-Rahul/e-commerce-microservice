package com.e_commerce.inventory.dto.inventory;

import lombok.Data;

import java.util.List;

@Data
public class ProductInventoryRequest {

    private String variantId;

    private String sku;

    private Integer quantity;

    private Double price;

    private String name;

    private String stockDescription;

    private List<KeyValuePair> additionalFields;
}
