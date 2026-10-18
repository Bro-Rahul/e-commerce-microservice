package com.e_commerce.search.rabbitmq.eventDispatcher;

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
        ProductCreatedEventConsumer consumer = objectMapper.readValue(message.getBody(),ProductCreatedEventConsumer.class);
        productService.createProductDocument(consumer);
    }
}