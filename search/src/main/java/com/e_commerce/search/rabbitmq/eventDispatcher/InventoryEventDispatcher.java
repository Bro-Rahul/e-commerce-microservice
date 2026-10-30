package com.e_commerce.search.rabbitmq.eventDispatcher;

import com.e_commerce.commons.events.inventory.ProductInventoryUpdateEvent;
import com.e_commerce.search.services.inventory.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Message;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

@Component
@RequiredArgsConstructor
public class InventoryEventDispatcher {

    private final InventoryService service;
    private final ObjectMapper objectMapper;

    public void dispatchEvent(Message message, String routingKey) {
        switch (routingKey) {
            case "inventory.stock.updated":
                consumeProductInventoryUpdateEvent(message);
                break;
            default:
                break;
        }
    }

    private void consumeProductInventoryUpdateEvent(Message message){
        ProductInventoryUpdateEvent event = objectMapper.readValue(
                message.getBody(),
                ProductInventoryUpdateEvent.class
        );
        service.consumeInventoryUpdateEvent(event);
    }
}
