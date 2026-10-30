package com.e_commerce.commons.events.products;

import com.e_commerce.commons.constants.RabbitMQConstants;
import com.e_commerce.commons.dto.product.ProductStatus;
import com.e_commerce.commons.events.Event;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ProductVariantStatusUpdateEvent implements Event {

    private String variantId;
    private String eventId;
    private LocalDateTime createdAt;

    private ProductStatus status;

    public ProductVariantStatusUpdateEvent(String variantId,ProductStatus status){
        this.status = status;
        this.variantId = variantId;
        this.createdAt = LocalDateTime.now();
        this.eventId = UUID.randomUUID().toString();
    }

    @Override
    public String getRoutingKey() {
        return "catalog.product.status_update";
    }

    @Override
    public String getExchangeName() {
        return RabbitMQConstants.CATALOG_EXCHANGE;
    }
}
