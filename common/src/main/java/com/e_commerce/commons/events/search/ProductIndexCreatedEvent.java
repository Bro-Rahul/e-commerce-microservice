package com.e_commerce.commons.events.search;

import com.e_commerce.commons.constants.RabbitMQConstants;
import com.e_commerce.commons.dto.inventory.ProductInventoryRequest;
import com.e_commerce.commons.dto.product.Variant;
import com.e_commerce.commons.events.products.ProductCreatedEvent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ProductIndexCreatedEvent extends ProductCreatedEvent {

    public ProductIndexCreatedEvent(
            List<Variant> products,
            List<ProductInventoryRequest> productInventories) {
        super(products, productInventories);
    }

    @Override
    public String getExchangeName() {
        return RabbitMQConstants.SEARCH_EXCHANGE;
    }

    @Override
    public String getRoutingKey() {
        return "search.product.created";
    }
}
