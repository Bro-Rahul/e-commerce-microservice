package com.e_commerce.inventory.rabbitmq.consumer;

import com.e_commerce.inventory.rabbitmq.dispatcher.SearchDispatcher;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SearchConsumer {

    private final SearchDispatcher dispatcher;

    @RabbitListener(queues = "search.stockQueue")
    public void consumeEvent(
            Message message,
            @Header(AmqpHeaders.RECEIVED_ROUTING_KEY) String routingKey
    ){
       try {
           dispatcher.dispatch(message,routingKey);
       }catch (Exception e){
           long retry = message.getMessageProperties().getRetryCount();
           System.out.println("current try count "+ retry);
           if(retry == 3){
               // publish fail event
               System.out.println("All retry completed putting message into dlq ");
           }
           message.getMessageProperties().incrementRetryCount();
           throw e;
       }
    }
}
