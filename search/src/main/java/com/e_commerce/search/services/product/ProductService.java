package com.e_commerce.search.services.product;

import java.util.ArrayList;
import java.util.List;

import com.e_commerce.search.dto.events.consumer.product.ProductCreatedEventConsumer;
import com.e_commerce.search.dto.inventory.ProductInventoryRequest;
import com.e_commerce.search.dto.product.ProductVariantRequest;
import com.e_commerce.search.mapper.InventoryMapper;
import com.e_commerce.search.mapper.ProductsMapper;
import com.e_commerce.search.model.ProductInventory;
import com.e_commerce.search.model.Products;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.e_commerce.search.repo.ProductRepo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepo repo;
    private final InventoryMapper inventoryMapper;
    private final ProductsMapper mapper;

    @Transactional
    public void createProductDocument(ProductCreatedEventConsumer productCreatedEventConsumer) {
        List<Products> productsList = new ArrayList<>();

        List<ProductVariantRequest> productVariantRequestList = productCreatedEventConsumer.getProducts();
        List<ProductInventoryRequest> inventoryRequests = productCreatedEventConsumer.getProductInventory();
        for (int i = 0; i < productVariantRequestList.size(); i++) {
            Products product = mapper.toEntity(productVariantRequestList.get(i));
            product.setInventory(inventoryMapper.toEntity(inventoryRequests.get(i)));
            product.setVariantInfo(productCreatedEventConsumer.getVariantInfo());
            productsList.add(product);
        }

        repo.saveAll(productsList);
    }

}
