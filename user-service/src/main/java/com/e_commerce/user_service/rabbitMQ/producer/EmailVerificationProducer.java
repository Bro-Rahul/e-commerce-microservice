package com.e_commerce.user_service.rabbitMQ.producer;

import com.e_commerce.user_service.model.OutBox;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailVerificationProducer {

    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${rabbitmq.notification.binding_key}")
    private String routingKey;

    private final RabbitTemplate rabbitTemplate;

    public void sendEmailVerificationRequest(OutBox outBox){
        rabbitTemplate.convertAndSend(exchangeName,routingKey,outBox);
    }
}
