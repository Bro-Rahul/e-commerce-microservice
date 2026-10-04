package com.e_commerce.search.rabbitmq.consumers;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.e_commerce.search.dto.events.product.ProductCreatedEvent;
import com.e_commerce.search.rabbitmq.eventDispatcher.ProductEventDispatcher;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class ProductConsumer {

    private final ProductEventDispatcher dispatcher;

    @RabbitListener(queues = "catalog.searchQueue")
    public void productCreatedConsumer(ProductCreatedEvent event) {
        dispatcher.dispatchEvent(event);
    }

}
