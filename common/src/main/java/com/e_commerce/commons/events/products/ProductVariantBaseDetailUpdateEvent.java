package com.e_commerce.commons.events.products;

import com.e_commerce.commons.constants.RabbitMQConstants;
import com.e_commerce.commons.events.Event;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ProductVariantBaseDetailUpdateEvent implements Event {
    private String eventId;
    private LocalDateTime createdAt;

    private String variantId;
    private String title;
    private String category;
    private String about;
    private String description;

    public ProductVariantBaseDetailUpdateEvent(
            String variantId,
            String title,
            String category,
            String description,
            String about
    ){
        this.eventId = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
        this.variantId = variantId;
        this.title = title;
        this.category = category;
        this.about = about;
        this.description = description;
    }

    @Override
    public String getRoutingKey() {
        return "catalog.product.base_detail_updated";
    }

    @Override
    public String getExchangeName() {
        return RabbitMQConstants.CATALOG_EXCHANGE;
    }
}
