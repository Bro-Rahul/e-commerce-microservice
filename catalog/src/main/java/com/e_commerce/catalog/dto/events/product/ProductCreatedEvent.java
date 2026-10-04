package com.e_commerce.catalog.dto.events.product;

import java.util.List;

import com.e_commerce.catalog.dto.events.Event;
import com.e_commerce.catalog.model.Products;
import com.e_commerce.catalog.dto.product.ProductInventoryRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreatedEvent implements Event {

    private Products product;
    private List<ProductInventoryRequest> inventories;

    @Override
    public String getRoutingKey() {
        return "catalog.created";
    }
}