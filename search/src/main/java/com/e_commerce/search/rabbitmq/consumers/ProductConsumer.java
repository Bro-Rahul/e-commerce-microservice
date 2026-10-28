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
    @RabbitListener(queues = "catalog.productIndexQueue")
    public void productCreatedConsumer(
            Message message,
            @Header(AmqpHeaders.RECEIVED_ROUTING_KEY) String routingKey
    ) {
        try {
            System.out.println("consuming event");
            dispatcher.dispatchEvent(message,routingKey);
            System.out.println("Event Consumed success");
        }catch (Exception e){
            long retry = message.getMessageProperties().getRetryCount();
            System.out.println(retry);
            if(retry == 3){
                // publish fail event
                System.out.println("All retry completed putting message into dlq ");
            }
            message.getMessageProperties().incrementRetryCount();
            throw e;
        }
    }

}
