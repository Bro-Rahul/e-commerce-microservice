package com.e_commerce.inventory.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.e_commerce.inventory.dto.inventory.InventoryRequest;
import com.e_commerce.inventory.model.Inventory;

@Mapper(componentModel = "spring")
public interface InventoryMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "productId", ignore = true)
    Inventory toEntity(InventoryRequest request);

}
