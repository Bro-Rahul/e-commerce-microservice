package com.e_commerce.notification.dto.events.user;

import com.e_commerce.notification.dto.events.Event;

public record UserCreatedEvent (
    String email
)implements Event {
    @Override
    public String getRoutingKey() {
        return "user.created";
    }
}
