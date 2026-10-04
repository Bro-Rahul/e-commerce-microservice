package com.e_commerce.inventory.dto.event.product;

import java.util.List;

import com.e_commerce.inventory.dto.event.Event;
import com.e_commerce.inventory.dto.product.ProductRequest;
import com.e_commerce.inventory.dto.inventory.InventoryRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreatedEvent implements Event {

    private ProductRequest product;
    private List<InventoryRequest> inventories;

    @Override
    public String getRoutingKey() {
        return "catalog.created";
    }
}
