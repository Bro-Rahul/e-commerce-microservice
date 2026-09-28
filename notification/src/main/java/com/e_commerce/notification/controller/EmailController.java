package com.e_commerce.notification.controller;


import com.e_commerce.notification.dto.mail.EmailRequest;
import com.e_commerce.notification.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class EmailController {


    private final EmailService emailService;

    @PostMapping("/sendMail")
    public String sendMail(
             @RequestBody EmailRequest details) {

        emailService.sendEmilInBackground(details);
        return "Email is Send in background";
    }

    @PostMapping("/sendMailWithAttachment")
    public String sendMailWithAttachment(
            @RequestBody EmailRequest details) {

        return emailService
                .sendMailWithAttachment(details);
    }
}