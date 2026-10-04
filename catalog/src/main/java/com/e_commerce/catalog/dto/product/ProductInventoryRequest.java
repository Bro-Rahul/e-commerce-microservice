package com.e_commerce.catalog.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductInventoryRequest {

    private String sku;

    private String name;

    private Integer quantity;

    private Double price;

    private String stockDescription;

    private List<KeyValuePair> additionalFields;
}
