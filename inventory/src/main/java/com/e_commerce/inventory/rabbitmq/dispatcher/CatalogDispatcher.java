package com.e_commerce.inventory.rabbitmq.dispatcher;

import com.e_commerce.inventory.dto.events.consumers.EventConsumer;
import com.e_commerce.inventory.dto.events.consumers.product.ProductCreatedEventConsumer;
import com.e_commerce.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Message;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

@Component
@RequiredArgsConstructor
public class CatalogDispatcher {

    private final InventoryService inventoryService;
    private final ObjectMapper objectMapper;

    public void dispatch(Message message,String routingKey){
        switch (routingKey){
            case "catalog.product.created"-> consumeProductCreatedEvent(message);
        }
    }

    private void consumeProductCreatedEvent(Message message){
        ProductCreatedEventConsumer consumer = objectMapper.readValue(message.getBody(), ProductCreatedEventConsumer.class);
        inventoryService.createInventories(consumer.getProductInventory());
    }
}
