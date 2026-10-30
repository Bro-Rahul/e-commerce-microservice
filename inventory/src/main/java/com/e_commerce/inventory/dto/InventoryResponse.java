package com.e_commerce.inventory.dto;

import com.e_commerce.inventory.model.AdditionalFields;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryResponse {
    private String variantId;

    private String sku;

    private String name;

    private String stockDescription;

    private Double price;

    private Integer quantity;

    private List<AdditionalFields> additionalFields;

}
