package com.e_commerce.inventory.service;

import com.e_commerce.commons.dto.inventory.ProductInventoryRequest;
import com.e_commerce.commons.events.inventory.ProductInventoryCreatedEvent;
import com.e_commerce.inventory.mapper.InventoryMapper;
import com.e_commerce.inventory.model.Inventory;
import com.e_commerce.inventory.rabbitmq.EventPublisher;
import com.e_commerce.inventory.repo.InventoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepo inventoryRepo;
    private final InventoryMapper inventoryMapper;
    private final EventPublisher eventPublisher;

    @Transactional
    public void createInventories(List<ProductInventoryRequest> inventoryRequests, String productId){
        List<Inventory> inventoryList = new ArrayList<>();
        for(ProductInventoryRequest request : inventoryRequests){
            Inventory inventory = inventoryMapper.toEntity(request);
            inventoryList.add(inventory);
        }
        inventoryRepo.saveAll(inventoryList);
        ProductInventoryCreatedEvent event = new ProductInventoryCreatedEvent();
        event.setProductId(productId);
        eventPublisher.publishEvent(event);
    }
}
