package com.e_commerce.search.services.product;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e_commerce.search.dto.events.inventory.InventoryCreatedEvent;
import com.e_commerce.search.dto.events.product.ProductCreatedEvent;
import com.e_commerce.search.model.Products;
import com.e_commerce.search.repo.ProductRepo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepo repo;

    @Transactional
    public void createProductDocument(ProductCreatedEvent productCreatedEvent) {
        Products product = new Products();

        product.setTitle(productCreatedEvent.getProduct().getTitle());
        product.setAboutItem(productCreatedEvent.getProduct().getAboutItem());
        product.setAssets(productCreatedEvent.getProduct().getAssets());
        product.setCategory(productCreatedEvent.getProduct().getCategory());
        product.setCoverImageURL(productCreatedEvent.getProduct().getCoverImageURL());
        product.setDescription(productCreatedEvent.getProduct().getDescription());
        product.setProductId(productCreatedEvent.getProduct().getId());
        product.setMetaDetails(productCreatedEvent.getProduct().getMetaDetails());
        product.setProductStatus(productCreatedEvent.getProduct().getProductStatus());
        repo.save(product);
    }

    @Transactional
    public void createInventory(String productId, InventoryCreatedEvent inventoryRequest) {
        Optional<Products> optionalProduct = repo.findByProductId(productId);
        if (optionalProduct.isEmpty())
            throw new RuntimeException("Product not found");

        Products product = optionalProduct.get();
        product.setInventory(inventoryRequest.getInventories());
        repo.save(product);

    }
}
