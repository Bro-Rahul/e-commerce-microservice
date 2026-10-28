package com.e_commerce.inventory.service;

import com.e_commerce.inventory.dto.InventoryResponse;
import com.e_commerce.inventory.exception.InventoryNotFoundException;
import com.e_commerce.inventory.mapper.InventoryMapper;
import com.e_commerce.inventory.model.Inventory;
import com.e_commerce.inventory.repo.InventoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class InventoryQueryService {

    private final InventoryRepo inventoryRepo;
    private final InventoryMapper mapper;

    public ResponseEntity<InventoryResponse> getVariantInventory(String variantId) {
        Optional<Inventory> inventory = inventoryRepo.findByVariantId(variantId);
        if(inventory.isEmpty()) throw new InventoryNotFoundException("Inventory does not exists for this variant","/seller/stock/{id}","INVENTORY_NOT_FOUND");
        return ResponseEntity.ok(mapper.toDTO(inventory.get()));
    }
}
