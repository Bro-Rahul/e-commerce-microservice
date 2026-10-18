package com.e_commerce.search.dto.events.consumer.product;

import com.e_commerce.search.dto.events.consumer.EventConsumerDTO;
import com.e_commerce.search.dto.inventory.ProductInventoryRequest;
import com.e_commerce.search.dto.product.ProductVariantRequest;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ProductCreatedEventConsumer extends EventConsumerDTO {

    private List<ProductVariantRequest> products;

    private Map<String,Object> variantInfo;

    private List<ProductInventoryRequest> productInventory;
}
