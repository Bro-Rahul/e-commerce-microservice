package com.e_commerce.search.mapper;

import com.e_commerce.search.dto.inventory.ProductInventoryRequest;
import com.e_commerce.search.model.ProductInventory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InventoryMapper {

    ProductInventory toEntity(ProductInventoryRequest request);
}

