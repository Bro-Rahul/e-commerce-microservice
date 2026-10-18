package com.e_commerce.catalog.rabbitmq;

import com.e_commerce.catalog.dto.events.publisher.product.EventPublisherDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import tools.jackson.databind.ObjectMapper;

@Component
@RequiredArgsConstructor
public class EventPublisher {

    @Value("${catalog.exchange}")
    private String exchangeName;

    private final RabbitTemplate rabbitTemplate;
    private final ObjectMapper objectMapper;

    public void publishEvent(EventPublisherDTO event) {
        String json = objectMapper.writeValueAsString(event);
        rabbitTemplate.convertAndSend(
                exchangeName,
                event.getRoutingKey(),
                json,
                message -> {
                    message.getMessageProperties().setContentType("application/json");
                    return message;
                });
    }
}
