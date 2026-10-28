package com.e_commerce.search.model;

import java.util.List;

import com.e_commerce.commons.dto.util.KeyValuePair;
import lombok.Data;

@Data
public class ProductInventory {

    private String variantId;

    private String sku;

    private String name;

    private String stockDescription;

    private Double price;

    private Integer quantity;

    private List<KeyValuePair> additionalFields;

}
