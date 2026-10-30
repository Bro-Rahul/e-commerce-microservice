package com.e_commerce.search.services.inventory;

import com.e_commerce.commons.events.inventory.ProductInventoryUpdateEvent;
import com.e_commerce.search.exception.product.ProductNotFoundException;
import com.e_commerce.search.model.Products;
import com.e_commerce.search.repo.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class InventoryService {

    private final ProductRepo repo;

    public void consumeInventoryUpdateEvent(ProductInventoryUpdateEvent event) {
        Optional<Products> optionalProduct = repo.findByVariantId(event.getVariantId());
        if(optionalProduct.isEmpty())
            throw new ProductNotFoundException("Variant Does Not Exists","VARIANT_NOT_FOUND",null);

        Products product = optionalProduct.get();
        product.getInventory().setAdditionalFields(event.getAdditionalFields());
        product.getInventory().setName(event.getName());
        product.getInventory().setStockDescription(event.getStockDescription());
        product.getInventory().setPrice(event.getPrice());
        product.getInventory().setSku(event.getSku());
        product.getInventory().setQuantity(event.getQuantity());

        repo.save(product);
    }
}
