package com.e_commerce.commons.events.inventory;

import com.e_commerce.commons.constants.RabbitMQConstants;
import com.e_commerce.commons.events.Event;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ProductInventoryCreatedEvent implements Event {
    private String eventId;

    private LocalDateTime createdAt;

    private String productId;

    @Override
    public String getRoutingKey() {
        return "inventory.stock.created";
    }

    @Override
    public String getExchangeName() {
        return RabbitMQConstants.INVENTORY_EXCHANGE;
    }
}