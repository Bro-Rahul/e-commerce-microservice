package com.e_commerce.inventory.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.e_commerce.inventory.dto.event.inventory.InventoryCreatedEvent;
import com.e_commerce.inventory.dto.event.product.ProductCreatedEvent;
import com.e_commerce.inventory.dto.inventory.InventoryRequest;
import com.e_commerce.inventory.mapper.InventoryMapper;
import com.e_commerce.inventory.model.Inventory;
import com.e_commerce.inventory.rabbitmq.EventPublisher;
import com.e_commerce.inventory.repo.InventoryRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepo repo;
    private final InventoryMapper inventoryMapper;
    private final EventPublisher publisherEvent;

    public void consumeProductCreatedEvent(ProductCreatedEvent event) {
        createProductInventory(event.getProduct().getId(), event.getInventories());
    }

    @Transactional
    public void createProductInventory(String productId, List<InventoryRequest> inventoryRequests) {
        List<Inventory> inventories = new ArrayList<>();
        for (var inventoryData : inventoryRequests) {
            Inventory inventory = inventoryMapper.toEntity(inventoryData);
            inventory.setProductId(productId);
            inventories.add(repo.save(inventory));
        }
        publisherEvent.publishEvent(new InventoryCreatedEvent(productId, inventories));
        return;
    }

    public ResponseEntity<List<Inventory>> getProductInventory(String id) {
        Optional<List<Inventory>> invOptional = repo.findByProductId(id);
        if (invOptional.isEmpty())
            throw new RuntimeException("No Inventory for this product");
        return ResponseEntity.ok(invOptional.get());
    }

    public ResponseEntity<List<Inventory>> getAllInventory() {
        return ResponseEntity.ok(repo.findAll());
    }

}
