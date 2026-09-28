package com.e_commerce.users.dto.events;

public record UserCreatedEvent(
        String email
) implements Event{

    @Override
    public String getRoutingKey() {
        return "user.created";
    }
}
