package com.e_commerce.search.rabbitmq.eventDispatcher;

import org.springframework.stereotype.Component;

import com.e_commerce.search.dto.events.Event;
import com.e_commerce.search.dto.events.inventory.InventoryCreatedEvent;
import com.e_commerce.search.services.product.ProductService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InventoryDispatcher {

    private final ProductService productService;

    public void dispatch(Event event) {

        switch (event.getRoutingKey()) {
            case "inventory.created":
                consumeInventoryCreateEvent((InventoryCreatedEvent) event);
                break;
            default:
                break;
        }
    }

    public void consumeInventoryCreateEvent(InventoryCreatedEvent inventoryRequest) {
        productService.createInventory(inventoryRequest.getProductId(), inventoryRequest);
    }

}
