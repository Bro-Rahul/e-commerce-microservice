package com.e_commerce.catalog.rabbitmq.consumer;


import com.e_commerce.catalog.rabbitmq.dispatcher.InventoryDispatcher;
import com.e_commerce.commons.events.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InventoryConsumer {

    private final InventoryDispatcher dispatcher;

    @RabbitListener(queues = "inventoryQueue")
    public void consumeEvent(Event event, Message message){
        dispatcher.dispatchEvent(event);
    }
}
