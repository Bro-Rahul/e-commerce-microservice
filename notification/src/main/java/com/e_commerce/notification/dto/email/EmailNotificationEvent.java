package com.e_commerce.notification.dto.email;

import com.e_commerce.notification.dto.events.Event;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailNotificationEvent implements Event {
    private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;

    @Override
    public String getRoutingKey() {
        return "notification.email";
    }
}
