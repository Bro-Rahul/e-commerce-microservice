package com.e_commerce.commons.events.products;

import com.e_commerce.commons.constants.RabbitMQConstants;
import com.e_commerce.commons.dto.inventory.ProductInventoryRequest;
import com.e_commerce.commons.dto.product.Variant;
import com.e_commerce.commons.events.Event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ProductCreatedEvent implements Event {
    private String eventId;

    private LocalDateTime createdAt;

    private List<Variant> products;

    private List<ProductInventoryRequest> productInventories;

    public ProductCreatedEvent(
            List<Variant> products,
            List<ProductInventoryRequest> productInventories) {
        this.createdAt = LocalDateTime.now();
        this.eventId = UUID.randomUUID().toString();
        this.products = products;
        this.productInventories = productInventories;
    }

    @Override
    public String getRoutingKey() {
        return "catalog.product.created";
    }

    @Override
    public String getExchangeName() {
        return RabbitMQConstants.CATALOG_EXCHANGE;
    }
}
