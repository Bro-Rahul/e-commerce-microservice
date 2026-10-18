package com.e_commerce.catalog.dto.events.consumer;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BaseEventConsumerDTO {

    private final String eventId;
    private final LocalDateTime createdAt;
    private final String eventType;

}
