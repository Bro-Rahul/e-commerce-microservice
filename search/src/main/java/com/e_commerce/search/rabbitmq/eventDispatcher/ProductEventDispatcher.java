package com.e_commerce.search.rabbitmq.eventDispatcher;

import com.e_commerce.commons.events.products.ProductCreatedEvent;
import com.e_commerce.search.dto.events.consumer.product.ProductCreatedEventConsumer;
import org.springframework.amqp.core.Message;
import org.springframework.stereotype.Component;
import com.e_commerce.search.services.product.ProductService;

import lombok.RequiredArgsConstructor;
import tools.jackson.databind.ObjectMapper;

@Component
@RequiredArgsConstructor
public class ProductEventDispatcher {

    private final ProductService productService;
    private final ObjectMapper objectMapper;

    public void dispatchEvent(Message message,String routingKey) {
        switch (routingKey) {
            case "catalog.product.created":
                processProductCreatedEvent(message);
                break;

            default:
                break;
        }
    }

    public void processProductCreatedEvent(Message message) {
        ProductCreatedEvent consumer = objectMapper.readValue(message.getBody(), ProductCreatedEvent.class);
        productService.createProductDocument(consumer);
    }
}