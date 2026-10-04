package com.e_commerce.inventory.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.e_commerce.inventory.model.Inventory;
import com.e_commerce.inventory.service.InventoryService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequestMapping("/seller/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping("")
    private ResponseEntity<List<Inventory>> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    @GetMapping("/{id}")
    private ResponseEntity<List<Inventory>> getInventory(@PathVariable String id) {
        return inventoryService.getProductInventory(id);
    }
}