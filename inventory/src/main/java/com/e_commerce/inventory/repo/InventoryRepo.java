package com.e_commerce.inventory.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.e_commerce.inventory.model.Inventory;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InventoryRepo extends JpaRepository<Inventory, String> {
    Optional<Inventory> findByVariantId(String variantId);
}
