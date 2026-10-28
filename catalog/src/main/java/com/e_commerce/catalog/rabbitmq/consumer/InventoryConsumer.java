package com.e_commerce.catalog.rabbitmq.consumer;

import com.e_commerce.catalog.rabbitmq.dispatcher.InventoryDispatcher;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Message;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InventoryConsumer {

    private final InventoryDispatcher dispatcher;

    @RabbitListener(queues = "inventory.ProductQueue")
    public void consumeEvent(
            Message message,
            @Header(AmqpHeaders.RECEIVED_ROUTING_KEY) String routingKey) {
        dispatcher.dispatchEvent(message, routingKey);
    }
}
