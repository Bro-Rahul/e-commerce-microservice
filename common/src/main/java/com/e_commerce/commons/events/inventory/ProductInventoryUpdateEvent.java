package com.e_commerce.commons.events.inventory;

import com.e_commerce.commons.constants.RabbitMQConstants;
import com.e_commerce.commons.dto.inventory.ProductInventoryRequest;
import com.e_commerce.commons.dto.util.KeyValuePair;
import com.e_commerce.commons.events.Event;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ProductInventoryUpdateEvent implements Event {

    private String eventId;

    private LocalDateTime createdAt;

    private String variantId;

    private String sku;

    private String name;

    private Integer quantity;

    private Double price;

    private String stockDescription;

    private List<KeyValuePair> additionalFields;

    public ProductInventoryUpdateEvent(ProductInventoryRequest request){
        this.eventId = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();

        this.variantId = request.getVariantId();
        this.sku = request.getSku();
        this.name = request.getName();
        this.quantity = request.getQuantity();
        this.price = request.getPrice();
        this.stockDescription = request.getStockDescription();
        this.additionalFields = request.getAdditionalFields();
    }

    @Override
    public String getRoutingKey() {
        return "inventory.stock.updated";
    }

    @Override
    public String getExchangeName() {
        return RabbitMQConstants.INVENTORY_EXCHANGE;
    }
}
