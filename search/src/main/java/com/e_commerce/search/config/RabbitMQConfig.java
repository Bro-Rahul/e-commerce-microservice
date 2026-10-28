package com.e_commerce.search.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.retry.MessageRecoverer;
import org.springframework.amqp.rabbit.retry.RepublishMessageRecoverer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.e_commerce.commons.constants.RabbitMQConstants;

@Configuration
public class RabbitMQConfig {

    @Bean
    public TopicExchange exchange(){
        return new TopicExchange(RabbitMQConstants.SEARCH_EXCHANGE);
    }

    @Bean
    public Queue searchQueue(){
        return QueueBuilder
                .durable("search.stockQueue")
                .deadLetterRoutingKey("search.dlx")
                .deadLetterExchange(RabbitMQConstants.SEARCH_EXCHANGE)
                .build();
    }

    @Bean
    public Queue searchDLQ(){
        return QueueBuilder
                .durable("search.dlq")
                .build();
    }

    @Bean
    public Binding searchBinding(){
        return BindingBuilder
                .bind(searchQueue())
                .to(exchange())
                .with("search.product.created");
    }

    @Bean
    public Binding seachDLQ(){
        return BindingBuilder
                .bind(searchDLQ())
                .to(exchange())
                .with(RabbitMQConstants.SEARCH_DLX_ROUTING_KEY);
    }

    @Bean
    public MessageRecoverer messageRecoverer(RabbitTemplate template){
        return new RepublishMessageRecoverer(template,RabbitMQConstants.SEARCH_EXCHANGE,RabbitMQConstants.SEARCH_DLX_ROUTING_KEY);
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory){
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        return template;
    }

}
