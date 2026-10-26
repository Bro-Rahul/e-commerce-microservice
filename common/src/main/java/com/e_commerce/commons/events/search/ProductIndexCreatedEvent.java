package com.e_commerce.commons.events.search;

import com.e_commerce.commons.dto.inventory.ProductInventoryRequest;
import com.e_commerce.commons.dto.product.Variant;
import com.e_commerce.commons.events.products.ProductCreatedEvent;
import java.util.List;

public class ProductIndexCreatedEvent extends ProductCreatedEvent {

    public ProductIndexCreatedEvent(
            List<Variant> products,
            List<ProductInventoryRequest> productInventories
    ) {
        super(products, productInventories);
    }
}
