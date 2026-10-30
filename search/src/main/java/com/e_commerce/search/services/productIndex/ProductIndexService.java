package com.e_commerce.search.services.productIndex;

import com.e_commerce.commons.events.inventory.ProductInventoryUpdateEvent;
import com.e_commerce.search.exception.product.ProductNotFoundException;
import com.e_commerce.search.model.Products;
import com.e_commerce.search.repo.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductIndexService {

    private final ProductRepo repo;

    @Transactional
    public void consumeInventoryUpdateEvent(ProductInventoryUpdateEvent event){
        Optional<Products> optionalProduct = repo.findByVariantId(event.getVariantId());
        if(optionalProduct.isEmpty())
            throw new ProductNotFoundException("No Such Product is exits with this variant Id","PRODUCT_NOT_FOUND","");
        Products product = optionalProduct.get();
        product.getInventory().setQuantity(event.getQuantity());
        product.getInventory().setSku(event.getSku());
        product.getInventory().setPrice(event.getPrice());
        product.getInventory().setStockDescription(event.getStockDescription());
        product.getInventory().setName(event.getName());
        product.getInventory().setAdditionalFields(event.getAdditionalFields());
        repo.save(product);
    }
}
