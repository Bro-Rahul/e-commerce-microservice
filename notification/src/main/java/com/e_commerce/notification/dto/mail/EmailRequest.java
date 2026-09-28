package com.e_commerce.notification.dto.mail;

import com.e_commerce.notification.dto.email.EmailNotificationEvent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailRequest {
    private String recipient;

    private String msgBody;

    private String subject;

    private String attachment;

    public EmailRequest(EmailNotificationEvent event){
        this.setAttachment(event.getAttachment());
        this.setRecipient(event.getRecipient());
        this.setSubject(event.getSubject());
        this.setMsgBody(event.getMsgBody());
    }
}
