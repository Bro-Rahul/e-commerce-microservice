package com.e_commerce.inventory.rabbitmq;

import com.e_commerce.commons.events.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

@Component
@RequiredArgsConstructor
public class EventPublisher {


    private final RabbitTemplate template;

    private final ObjectMapper mapper;

    public void publishEvent(Event event){
        String json = mapper.writeValueAsString(event);
        template.convertAndSend(
                event.getExchangeName(),
                event.getRoutingKey(),
                json,
                message -> {
                    message.getMessageProperties()
                            .setContentType("application/json");
                    return message;
                }
        );
    }
}
