package com.e_commerce.search.rabbitmq.consumers;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;
import com.e_commerce.search.rabbitmq.eventDispatcher.ProductEventDispatcher;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class ProductConsumer {

    private final ProductEventDispatcher dispatcher;

    @RabbitListener(queues = "catalog.searchQueue")
    public void productCreatedConsumer(
            Message message,
            @Header(AmqpHeaders.RECEIVED_ROUTING_KEY) String routingKey
    ) {
        dispatcher.dispatchEvent(message,routingKey);
    }

}
