package com.e_commerce.inventory.mapper;

import com.e_commerce.commons.dto.inventory.ProductInventoryRequest;
import com.e_commerce.commons.dto.util.KeyValuePair;
import com.e_commerce.inventory.dto.InventoryResponse;
import com.e_commerce.inventory.dto.UpdateInventoryRequest;
import com.e_commerce.inventory.model.AdditionalFields;
import com.e_commerce.inventory.model.Inventory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface InventoryMapper {

    Inventory toEntity(ProductInventoryRequest request);

    AdditionalFields toAdditionalField(KeyValuePair request);

    InventoryResponse toDTO(Inventory request);

    @Mapping(target = "variantId",source = "variantId")
    ProductInventoryRequest toInventoryRequest(String variantId,UpdateInventoryRequest request);

    void updateEntity(
            @MappingTarget Inventory inventory,
            UpdateInventoryRequest request
    );

    ProductInventoryRequest toInventoryRequest(UpdateInventoryRequest request);
}
