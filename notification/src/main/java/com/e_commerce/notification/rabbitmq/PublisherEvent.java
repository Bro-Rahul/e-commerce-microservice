package com.e_commerce.notification.rabbitmq;

import com.e_commerce.notification.dto.events.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PublisherEvent {

    @Value("${rabbitmq.exchange}")
    private String exchangeName;

    private final RabbitTemplate rabbitTemplate;

    public void publishEvent(Event event) {
        rabbitTemplate.convertAndSend(
                exchangeName,
                event.getRoutingKey(),
                event);
    }

}
