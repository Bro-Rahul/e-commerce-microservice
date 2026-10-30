package com.e_commerce.inventory.config;

import com.e_commerce.commons.constants.RabbitMQConstants;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.retry.MessageRecoverer;
import org.springframework.amqp.rabbit.retry.RepublishMessageRecoverer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    @Bean
    public TopicExchange exchange(){
        return new TopicExchange(RabbitMQConstants.INVENTORY_EXCHANGE);
    }


    @Bean
    public Queue inventoryProductQueue(){
        return QueueBuilder
                .durable("inventory.ProductQueue")
                .deadLetterExchange(RabbitMQConstants.INVENTORY_EXCHANGE)
                .deadLetterRoutingKey(RabbitMQConstants.INVENTORY_DLX_ROUTING_KEY)
                .build();
    }

    @Bean
    public Queue inventoryProductIndexQueue(){
        return QueueBuilder
                .durable("inventory.ProductIndexQueue")
                .deadLetterExchange(RabbitMQConstants.INVENTORY_EXCHANGE)
                .deadLetterRoutingKey(RabbitMQConstants.INVENTORY_DLX_ROUTING_KEY)
                .build();
    }

    @Bean
    public Queue inventoryDLQ(){
        return QueueBuilder
                .durable("inventory.dlq")
                .build();
    }

    @Bean
    public Binding inventoryProductBinding(){
        return BindingBuilder
                .bind(inventoryProductQueue())
                .to(exchange())
                .with("inventory.created");
    }

    @Bean
    public Binding inventoryProductIndexBinding(){
        return BindingBuilder
                .bind(inventoryProductIndexQueue())
                .to(exchange())
                .with("inventory.stock.*");
    }

    @Bean
    public Binding inventoryDLQBinding(){
        return BindingBuilder
                .bind(inventoryDLQ())
                .to(exchange())
                .with(RabbitMQConstants.INVENTORY_DLX_ROUTING_KEY);
    }

    @Bean
    public MessageRecoverer messageRecoverer(RabbitTemplate template){
        return new RepublishMessageRecoverer(template,RabbitMQConstants.INVENTORY_EXCHANGE,RabbitMQConstants.INVENTORY_DLX_ROUTING_KEY);
    }
}
