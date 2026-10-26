package com.e_commerce.catalog.rabbitmq;

import com.e_commerce.commons.events.Event;
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

    public void publishEvent(Event event){
        rabbitTemplate.convertAndSend(
                event.getExchangeName(),
                event.getRoutingKey(),
                event
        );
    }
}
