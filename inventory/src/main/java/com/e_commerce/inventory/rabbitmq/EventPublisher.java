package com.e_commerce.inventory.rabbitmq;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.e_commerce.inventory.dto.event.Event;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EventPublisher {

    @Value("${inventory-exchange}")
    private String exchangeName;

    private final RabbitTemplate rabbitTemplate;

    public void publishEvent(Event event) {
        rabbitTemplate.convertAndSend(
                exchangeName,
                event.getRoutingKey(),
                event);
    }
}
