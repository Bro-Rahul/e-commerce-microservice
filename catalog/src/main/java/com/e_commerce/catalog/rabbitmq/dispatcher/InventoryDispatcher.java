package com.e_commerce.catalog.rabbitmq.dispatcher;

import com.e_commerce.catalog.model.Products;
import com.e_commerce.catalog.model.ProductsVariants;
import com.e_commerce.catalog.repo.ProductVariantsRepo;
import com.e_commerce.commons.dto.product.ProductStatus;
import com.e_commerce.commons.events.Event;
import com.e_commerce.commons.events.inventory.ProductInventoryCreatedEvent;
import lombok.RequiredArgsConstructor;
import tools.jackson.databind.ObjectMapper;

import org.springframework.amqp.core.Message;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class InventoryDispatcher {

    private final ProductVariantsRepo repo;
    private final ObjectMapper mapper;

    public void dispatchEvent(Message message, String routingKey) {
        switch (routingKey) {
            case "inventory.stock.created" -> consumeInventoryCreatedEvent(message);
        }
    }

    private void consumeInventoryCreatedEvent(Message message) {

        ProductInventoryCreatedEvent event = mapper.readValue(message.getBody(),
                ProductInventoryCreatedEvent.class);
        List<ProductsVariants> variants = repo.findByProduct_id(event.getProductId());
        variants.forEach(item -> item.setProductStatus(ProductStatus.DRAFT));
        repo.saveAll(variants);
    }
}
