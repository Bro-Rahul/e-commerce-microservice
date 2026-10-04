package com.e_commerce.catalog.rabbitmq;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.e_commerce.catalog.dto.events.Event;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EventPublisher {

    @Value("${catalog.exchange}")
    private String exchangeName;

    private final RabbitTemplate rabbitTemplate;

    public void publishEvent(Event event) {
        rabbitTemplate.convertAndSend(
                exchangeName,
                event.getRoutingKey(),
                event);
    }

}
