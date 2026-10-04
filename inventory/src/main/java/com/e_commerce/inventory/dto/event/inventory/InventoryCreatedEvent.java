package com.e_commerce.inventory.dto.event.inventory;

import java.util.List;

import com.e_commerce.inventory.dto.event.Event;
import com.e_commerce.inventory.model.Inventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryCreatedEvent implements Event {

    private String productId;

    private List<Inventory> inventories;

    @Override
    public String getRoutingKey() {
        return "inventory.created";
    }

}
