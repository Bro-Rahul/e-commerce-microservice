package com.e_commerce.catalog.dto.product.seller;

import com.e_commerce.commons.dto.inventory.ProductInventoryRequest;
import com.e_commerce.commons.dto.product.ProductBaseDetail;
import lombok.Data;

import java.util.Map;

@Data
public class ProductCreationRequest {

    private ProductBaseDetail baseDetail;

    private ProductInventoryRequest inventory;

    private Boolean isMainVariant;

    private Map<String, Object> productMetaDetail;

}
