package com.e_commerce.search.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Value("${search-exchange}")
    private String exchangeName;

    @Bean
    public TopicExchange exchange(){
        return new TopicExchange(exchangeName);
    }

    @Bean
    public Queue searchQueue(){
        return new Queue("inventory.searchQueue");
    }

    @Bean
    public Binding searchBinding(){
        return BindingBuilder
                .bind(searchQueue())
                .to(exchange())
                .with("inventory.stock.*");
    }
}
