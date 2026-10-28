package com.e_commerce.inventory.mapper;

import com.e_commerce.commons.dto.inventory.ProductInventoryRequest;
import com.e_commerce.inventory.dto.InventoryResponse;
import com.e_commerce.inventory.model.Inventory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InventoryMapper {

    Inventory toEntity(ProductInventoryRequest request);

    InventoryResponse toDTO(Inventory request);
}
