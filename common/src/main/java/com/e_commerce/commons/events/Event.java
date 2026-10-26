package com.e_commerce.commons.events;

public interface Event {
    String getRoutingKey();
    String getExchangeName();
}
