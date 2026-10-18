package com.e_commerce.inventory.dto.events.producers;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public abstract class EventPublisher {
    private String eventId;
    private LocalDateTime createdAt;
    private String eventType;

    public abstract String getRoutingKey();

}
