package com.e_commerce.inventory.mapper;

import com.e_commerce.inventory.dto.inventory.ProductInventoryRequest;
import com.e_commerce.inventory.model.Inventory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InventoryMapper {

    public Inventory toEntity(ProductInventoryRequest request);
}
