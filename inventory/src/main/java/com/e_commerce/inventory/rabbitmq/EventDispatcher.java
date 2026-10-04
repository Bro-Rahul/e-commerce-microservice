package com.e_commerce.inventory.rabbitmq;

import org.springframework.stereotype.Component;

import com.e_commerce.inventory.dto.event.Event;
import com.e_commerce.inventory.dto.event.product.ProductCreatedEvent;
import com.e_commerce.inventory.service.InventoryService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EventDispatcher {

    private final InventoryService inventoryService;

    public void dispatch(Event event) {
        switch (event.getRoutingKey()) {
            case "catalog.created":
                inventoryService.consumeProductCreatedEvent((ProductCreatedEvent) event);
                break;

            default:
                break;
        }
    }

}
