package com.e_commerce.notification.rabbitmq;

import com.e_commerce.notification.dto.email.EmailNotificationEvent;
import com.e_commerce.notification.dto.events.user.UserCreatedEvent;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ConsumerEvent {

    private final EventDispatcher eventDispatcher;

    @RabbitListener(queues = "user")
    public void processUserEvent(UserCreatedEvent event){
        eventDispatcher.dispatch(event);
    }

    @RabbitListener(queues = "notification")
    public void processNotificationEvent(EmailNotificationEvent event){
        eventDispatcher.dispatch(event);
    }
}
