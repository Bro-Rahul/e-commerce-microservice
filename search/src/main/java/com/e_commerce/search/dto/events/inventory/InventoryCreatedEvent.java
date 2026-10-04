package com.e_commerce.search.dto.events.inventory;

import java.util.List;

import com.e_commerce.search.dto.events.Event;
import com.e_commerce.search.model.ProductInventory;

import lombok.Data;

@Data
public class InventoryCreatedEvent implements Event {

    private String productId;

    private List<ProductInventory> inventories;

    @Override
    public String getRoutingKey() {
        return "inventory.created";
    }
}
