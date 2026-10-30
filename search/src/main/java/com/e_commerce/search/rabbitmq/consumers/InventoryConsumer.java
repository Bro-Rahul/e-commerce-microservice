package com.e_commerce.search.rabbitmq.consumers;

import com.e_commerce.search.rabbitmq.eventDispatcher.InventoryEventDispatcher;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InventoryConsumer {

    private final InventoryEventDispatcher dispatcher;

    @RabbitListener(queues = "inventory.ProductIndexQueue")
    public void productCreatedConsumer(
            Message message,
            @Header(AmqpHeaders.RECEIVED_ROUTING_KEY) String routingKey
    ) {
        dispatcher.dispatchEvent(message,routingKey);
    }
}
