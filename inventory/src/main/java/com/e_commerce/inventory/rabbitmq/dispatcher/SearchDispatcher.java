package com.e_commerce.inventory.rabbitmq.dispatcher;

import com.e_commerce.commons.events.search.ProductIndexCreatedEvent;
import com.e_commerce.inventory.service.InventoryCommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Message;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

@Component
@RequiredArgsConstructor
public class SearchDispatcher {

    private final InventoryCommandService inventoryService;
    private final ObjectMapper objectMapper;

    public void dispatch(Message message,String routingKey){
        switch (routingKey){
            case "search.product.created"-> consumeProductCreatedEvent(message);
        }
    }

    private void consumeProductCreatedEvent(Message message){
        ProductIndexCreatedEvent consumer = objectMapper.readValue(message.getBody(), ProductIndexCreatedEvent.class);
        String productId = consumer.getProducts().getFirst().getProductId();
        inventoryService.createInventories(consumer.getProductInventories(),productId);
    }
}
