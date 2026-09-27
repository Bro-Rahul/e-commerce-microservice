package com.e_commerce.users.rabbitmq;

import com.e_commerce.users.dto.events.Event;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class EventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publishEvent(Event event){
        rabbitTemplate.convertAndSend(
                "e-commerce",
                event.getRoutingKey(),
                event
        );
    }

}
