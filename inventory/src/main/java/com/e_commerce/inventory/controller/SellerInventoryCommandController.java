package com.e_commerce.inventory.controller;

import com.e_commerce.inventory.dto.UpdateInventoryRequest;
import com.e_commerce.inventory.service.InventoryCommandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/seller")
@RequiredArgsConstructor
public class SellerInventoryCommandController {

    private final InventoryCommandService service;

    @PatchMapping("/stock/{variantId}")
    public ResponseEntity<?> updateVariantInventory(@PathVariable String variantId, @Valid @RequestBody UpdateInventoryRequest inventoryRequest){
        service.updateInventory(variantId,inventoryRequest);
        return ResponseEntity.ok().build();
    }

}
