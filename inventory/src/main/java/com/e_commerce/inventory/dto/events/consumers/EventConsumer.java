package com.e_commerce.inventory.dto.events.consumers;

import lombok.Data;
import java.time.LocalDateTime;


@Data
public abstract class EventConsumer {

    private String eventId;
    private LocalDateTime createdAt;
    private String eventType;

    public abstract String getRoutingKey();
}
