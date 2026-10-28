package com.e_commerce.inventory.controller;

import com.e_commerce.inventory.dto.InventoryResponse;
import com.e_commerce.inventory.service.InventoryQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/seller")
@RequiredArgsConstructor
public class SellerInventoryQueryController {

    private final InventoryQueryService service;

    @GetMapping("/stock/{variantId}")
    public ResponseEntity<InventoryResponse> getVariantInventory(@PathVariable String variantId){
        return service.getVariantInventory(variantId);
    }
}
