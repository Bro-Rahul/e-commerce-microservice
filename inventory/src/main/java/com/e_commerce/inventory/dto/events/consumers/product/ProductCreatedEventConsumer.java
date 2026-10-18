package com.e_commerce.inventory.dto.events.consumers.product;

import com.e_commerce.inventory.dto.events.consumers.EventConsumer;
import com.e_commerce.inventory.dto.inventory.ProductInventoryRequest;
import lombok.Data;


import java.util.List;

@Data
public class ProductCreatedEventConsumer extends EventConsumer {

    private List<ProductInventoryRequest> productInventory;

    @Override
    public String getRoutingKey() {
        return "catalog.product.created";
    }
}
