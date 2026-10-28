package com.e_commerce.catalog.rabbitmq;

import com.e_commerce.commons.events.Event;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import tools.jackson.databind.ObjectMapper;

@Component
@RequiredArgsConstructor
public class EventPublisher {

    private final RabbitTemplate rabbitTemplate;
    private final ObjectMapper objectMapper;

    public void publishEvent(Event event) {
        String json = objectMapper.writeValueAsString(event);
        rabbitTemplate.convertAndSend(
                event.getExchangeName(),
                event.getRoutingKey(),
                json,
                message -> {
                    message
                            .getMessageProperties()
                            .setContentType("application/json");
                    return message;
                });
    }
}
