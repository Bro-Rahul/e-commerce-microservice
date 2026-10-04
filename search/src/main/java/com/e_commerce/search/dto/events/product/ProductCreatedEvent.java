package com.e_commerce.search.dto.events.product;

import java.util.List;

import com.e_commerce.search.dto.events.Event;
import com.e_commerce.search.dto.product.ProductRequest;
import com.e_commerce.search.dto.inventory.ProductInventoryRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreatedEvent implements Event {

    private ProductRequest product;
    private List<ProductInventoryRequest> inventories;

    @Override
    public String getRoutingKey() {
        return "catalog.created";
    }
}
