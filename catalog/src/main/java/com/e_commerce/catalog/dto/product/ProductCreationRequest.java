package com.e_commerce.catalog.dto.product;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductCreationRequest {

    private ProductBaseDetail baseDetail;

    private ProductInventoryRequest inventory;

    private Map<String, Object> metaDetails;

}
