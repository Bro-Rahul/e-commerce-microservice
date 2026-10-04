package com.e_commerce.search.model;

import java.util.List;

import lombok.Data;

@Data
public class ProductInventory {

    private String id;

    private String sku;

    private String name;

    private String stockDescription;

    private Double price;

    private Integer quantity;

    private List<KeyValuePair> additionalFields;

}
