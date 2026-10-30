package com.e_commerce.commons.events.products;

import com.e_commerce.commons.constants.RabbitMQConstants;
import com.e_commerce.commons.events.Event;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ProductVariantMetaDetailsUpdatesEvent implements Event {
    private String eventId;
    private LocalDateTime createdAt;

    private String variantId;
    private Map<String,Object> metaDetails;

    public ProductVariantMetaDetailsUpdatesEvent(String variantId,Map<String,Object> metaDetails){
        this.eventId = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
        this.variantId = variantId;
        this.metaDetails = metaDetails;
    }


    @Override
    public String getRoutingKey() {
        return "catalog.product.meta_detail_updated";
    }

    @Override
    public String getExchangeName() {
        return RabbitMQConstants.CATALOG_EXCHANGE;
    }
}
