package com.e_commerce.catalog.config;

import com.e_commerce.commons.constants.RabbitMQConstants;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.retry.MessageRecoverer;
import org.springframework.amqp.rabbit.retry.RepublishMessageRecoverer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.swing.*;

@Configuration
public class CatalogRabbitConfig {

    private static final String prefix = "catalog";

    @Bean
    public TopicExchange exchange(){
        return new TopicExchange(RabbitMQConstants.CATALOG_EXCHANGE);
    }

    @Bean
    public Queue catalogDeadLetterQueue(){
        return QueueBuilder
                .durable("catalog.dlq")
                .build();
    }

    @Bean
    public Queue searchQueue(){
        return QueueBuilder
                .durable(String.format("%s.%s",prefix,RabbitMQConstants.PRODUCT_INDEX_QUEUE))
                .deadLetterExchange(RabbitMQConstants.CATALOG_EXCHANGE)
                .deadLetterRoutingKey(RabbitMQConstants.CATALOG_DLX_ROUTING_KEY)
                .build();
    }

    @Bean
    public Binding searchBinding(){
        return BindingBuilder
                .bind(searchQueue())
                .to(exchange())
                .with("catalog.product.*");
    }

    @Bean
    public Binding catalogDeadLetterQueueBinding(){
        return BindingBuilder
                .bind(catalogDeadLetterQueue())
                .to(exchange())
                .with(RabbitMQConstants.CATALOG_DLX_ROUTING_KEY);
    }

    @Bean
    public MessageRecoverer messageRecoverer(RabbitTemplate template){
        return new RepublishMessageRecoverer(template,RabbitMQConstants.CATALOG_EXCHANGE,RabbitMQConstants.CATALOG_DLX_ROUTING_KEY);
    }

}
