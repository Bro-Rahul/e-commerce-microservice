package com.e_commerce.inventory.service;

import com.e_commerce.commons.dto.inventory.ProductInventoryRequest;
import com.e_commerce.commons.events.inventory.ProductInventoryCreatedEvent;
import com.e_commerce.commons.events.inventory.ProductInventoryUpdateEvent;
import com.e_commerce.inventory.dto.UpdateInventoryRequest;
import com.e_commerce.inventory.exception.InventoryNotFoundException;
import com.e_commerce.inventory.mapper.InventoryMapper;
import com.e_commerce.inventory.model.Inventory;
import com.e_commerce.inventory.rabbitmq.EventPublisher;
import com.e_commerce.inventory.repo.InventoryRepo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InventoryCommandService {

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

    public void updateInventory(String variantId, @Valid UpdateInventoryRequest request) {
        Optional<Inventory> optionalInventory = inventoryRepo.findByVariantId(variantId);
        if(optionalInventory.isEmpty()){
            throw new InventoryNotFoundException("Inventory for this variant does does exits","inventory/seller/{id}","INVENTORY_NOT_FOUND");
        }

        Inventory inventory = optionalInventory.get();
        inventoryMapper.updateEntity(inventory,request);
        inventoryRepo.save(inventory);

        ProductInventoryRequest eventPayload = inventoryMapper.toInventoryRequest(request);
        eventPayload.setVariantId(inventory.getVariantId());
        ProductInventoryUpdateEvent event = new ProductInventoryUpdateEvent(eventPayload);
        System.out.println("publishing event");
        eventPublisher.publishEvent(event);

    }
}
