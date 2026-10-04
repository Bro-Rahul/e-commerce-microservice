package com.e_commerce.search.rabbitmq.eventDispatcher;

import org.springframework.stereotype.Component;

import com.e_commerce.search.dto.events.Event;
import com.e_commerce.search.dto.events.product.ProductCreatedEvent;
import com.e_commerce.search.services.product.ProductService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProductEventDispatcher {

    private final ProductService productService;

    public void dispatchEvent(Event event) {
        switch (event.getRoutingKey()) {
            case "catalog.created":
                processProductCreatedEvent((ProductCreatedEvent) event);
                break;

            default:
                break;
        }
    }

    public void processProductCreatedEvent(ProductCreatedEvent event) {
        productService.createProductDocument(event);
    }
}