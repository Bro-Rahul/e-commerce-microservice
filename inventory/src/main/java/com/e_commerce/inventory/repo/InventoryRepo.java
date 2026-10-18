package com.e_commerce.inventory.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.e_commerce.inventory.model.Inventory;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepo extends JpaRepository<Inventory, String> {
    Optional<List<Inventory>> findByVariantId(String variantId);
}
