package com.e_commerce.search.dto.events.consumer;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventConsumerDTO {

    private String eventId;
    private LocalDateTime createdAt;
    private String eventType;

}
