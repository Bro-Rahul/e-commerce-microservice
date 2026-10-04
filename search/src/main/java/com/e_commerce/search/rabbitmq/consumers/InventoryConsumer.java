package com.e_commerce.search.rabbitmq.consumers;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.e_commerce.search.dto.events.inventory.InventoryCreatedEvent;
import com.e_commerce.search.rabbitmq.eventDispatcher.InventoryDispatcher;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InventoryConsumer {

    private final InventoryDispatcher dispatcher;

    @RabbitListener(queues = "inventory.searchQueue")
    public void inventoryCreatedConsumer(InventoryCreatedEvent event) {
        dispatcher.dispatch(event);
    }
}
