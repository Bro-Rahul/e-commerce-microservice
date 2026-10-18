package com.e_commerce.catalog.config;

import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Value("${catalog.exchange}")
    private String exchangeName;

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(exchangeName);
    }

    @Bean
    public Queue inventoryQueue() {
        return new Queue("catalog.inventoryQueue");
    }

    @Bean
    public Queue searchQueue() {
        return new Queue("catalog.searchQueue");
    }

    @Bean
    public Binding inventoryBinding() {
        return BindingBuilder
                .bind(inventoryQueue())
                .to(exchange())
                .with("catalog.product.created");
    }

    @Bean
    public Binding searchBinding() {
        return BindingBuilder
                .bind(searchQueue())
                .to(exchange())
                .with("catalog.product.*");
    }
}