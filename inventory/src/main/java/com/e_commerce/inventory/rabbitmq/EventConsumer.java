package com.e_commerce.inventory.rabbitmq;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.e_commerce.inventory.dto.event.product.ProductCreatedEvent;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EventConsumer {

    private final EventDispatcher dispatcher;

    @RabbitListener(queues = "catalog.inventoryQueue")
    public void productCreatedEventConsumer(ProductCreatedEvent event) {
        dispatcher.dispatch(event);
    }

}
