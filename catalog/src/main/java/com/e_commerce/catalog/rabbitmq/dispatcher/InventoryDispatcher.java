package com.e_commerce.catalog.rabbitmq.dispatcher;

import com.e_commerce.catalog.model.ProductsVariants;
import com.e_commerce.catalog.repo.ProductVariantsRepo;
import com.e_commerce.commons.dto.product.ProductStatus;
import com.e_commerce.commons.events.Event;
import com.e_commerce.commons.events.inventory.ProductInventoryCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class InventoryDispatcher {

    private final ProductVariantsRepo repo;

    public void dispatchEvent(Event event){
        switch (event.getExchangeName()){
            case "inventory.stock.created"-> consumeEvent((ProductInventoryCreatedEvent) event);
        }
    }

    private void consumeEvent(ProductInventoryCreatedEvent event){
        List<ProductsVariants> variants = repo.findByProductId(event.getProductId());
        variants.forEach(item->item.setProductStatus(ProductStatus.DRAFT));
        repo.saveAll(variants);
    }
}
