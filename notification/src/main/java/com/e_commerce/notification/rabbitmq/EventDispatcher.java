package com.e_commerce.notification.rabbitmq;

import com.e_commerce.notification.dto.email.EmailNotificationEvent;
import com.e_commerce.notification.dto.events.Event;
import com.e_commerce.notification.dto.events.user.UserCreatedEvent;
import com.e_commerce.notification.dto.mail.EmailRequest;
import com.e_commerce.notification.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.time.Duration;

@Component
@RequiredArgsConstructor
public class EventDispatcher {

    private final EmailService emailService;
    private final RedisTemplate<String,Object> redisTemplate;
    private final SecureRandom RANDOM = new SecureRandom();


    public void dispatch(Event event){

        switch (event.getRoutingKey()){
            case "user.created":
                processUserCreated((UserCreatedEvent) event);

            case "notification.email":
                processEmailNotification((EmailNotificationEvent) event);
        }

    }

    public void processUserCreated(UserCreatedEvent event){
        String code = String.format(
                "%06d",
                RANDOM.nextInt(1_000_000)
        );
        redisTemplate.opsForValue().set(
                String.format("%s-code",event.email()),
                code,
                Duration.ofMinutes(5)
        );
        EmailRequest emailRequest = new EmailRequest();
        emailRequest.setRecipient(event.email());
        emailRequest.setMsgBody(String.format("Your Email Verification Code is %s",code));
        emailRequest.setSubject("Email Verification ");
        emailService.sendSimpleMail(emailRequest);
    }

    public void processEmailNotification(EmailNotificationEvent event){
        EmailRequest request = new EmailRequest(event);
        emailService.sendSimpleMail(request);
    }

}
