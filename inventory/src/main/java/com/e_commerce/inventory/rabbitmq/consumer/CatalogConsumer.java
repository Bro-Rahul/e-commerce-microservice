package com.e_commerce.inventory.rabbitmq.consumer;

import com.e_commerce.inventory.rabbitmq.dispatcher.CatalogDispatcher;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CatalogConsumer {

    private final CatalogDispatcher dispatcher;

    @RabbitListener(queues = "catalog.inventoryQueue")
    public void consumeEvent(
            Message message,
            @Header(AmqpHeaders.RECEIVED_ROUTING_KEY) String routingKey
    ){
       dispatcher.dispatch(message,routingKey);
    }
}
