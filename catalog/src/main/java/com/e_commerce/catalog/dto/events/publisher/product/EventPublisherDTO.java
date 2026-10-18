package com.e_commerce.catalog.dto.events.publisher.product;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Data;

@Data
public abstract class EventPublisherDTO {

    private final String eventId;
    private final LocalDateTime createdAt;
    private final String eventType;

    public EventPublisherDTO(String eventType){
        this.eventType = eventType;
        this.eventId = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
    }

    public abstract String getRoutingKey();
}
