package com.e_commerce.search.dto.inventory;

import java.util.List;

import com.e_commerce.search.model.KeyValuePair;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductInventoryRequest {

    private String sku;

    private String name;

    private String stockDescription;

    private Double price;

    private Integer quantity;

    private List<KeyValuePair> additionalFields;

}