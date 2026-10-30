package com.e_commerce.search.services.product;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.e_commerce.commons.dto.inventory.ProductInventoryRequest;
import com.e_commerce.commons.dto.product.ProductStatus;
import com.e_commerce.commons.dto.product.Variant;
import com.e_commerce.commons.events.products.ProductCreatedEvent;
import com.e_commerce.commons.events.products.ProductVariantBaseDetailUpdateEvent;
import com.e_commerce.commons.events.search.ProductIndexCreatedEvent;
import com.e_commerce.search.dto.product.ProductVariantRequest;
import com.e_commerce.search.mapper.ProductsMapper;
import com.e_commerce.search.model.Products;
import com.e_commerce.search.rabbitmq.EventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.e_commerce.search.repo.ProductRepo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepo repo;
    private final ProductsMapper mapper;
    private final EventPublisher eventPublisher;

    @Transactional
    public void createProductDocument(ProductCreatedEvent productCreatedEventConsumer) {
        List<Products> products = new ArrayList<>();
        List<Variant> productVariantRequestList = productCreatedEventConsumer.getProducts();
        List<ProductInventoryRequest> inventoryRequests = productCreatedEventConsumer.getProductInventories();
        for (int i = 0; i < productVariantRequestList.size(); i++) {
            Products variant = mapper.toEntity(
                    productVariantRequestList.get(i),
                    inventoryRequests.get(i),
                    new HashMap<>()
            );
            variant.setProductStatus(ProductStatus.DRAFT);
            products.add(variant);
        }
        repo.saveAll(products);
        ProductIndexCreatedEvent event = new ProductIndexCreatedEvent(
                productCreatedEventConsumer.getProducts(),
                productCreatedEventConsumer.getProductInventories()
        );
        eventPublisher.publishEvent(event);
    }
}
