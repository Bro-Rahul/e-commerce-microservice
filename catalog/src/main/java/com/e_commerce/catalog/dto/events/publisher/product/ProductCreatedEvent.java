package com.e_commerce.catalog.dto.events.publisher.product;

import java.util.List;
import java.util.Map;

import com.e_commerce.catalog.dto.inventory.ProductInventoryRequest;
import com.e_commerce.catalog.model.ProductsVariants;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductCreatedEvent extends EventPublisherDTO {

    private List<ProductsVariants> products;

    private Map<String, Map<String, String>> variantInfo;

    private List<ProductInventoryRequest> productInventory;

    public ProductCreatedEvent(
            List<ProductsVariants> products,
            Map<String, Map<String, String>> variantInfo,
            List<ProductInventoryRequest> productInventory
            ) {
        super("Product Created");
        this.products = products;
        this.variantInfo = variantInfo;
        this.productInventory = productInventory;
    }

    @Override
    public String getRoutingKey() {
        return "catalog.product.created";
    }

}