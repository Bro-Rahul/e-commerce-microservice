package com.e_commerce.search.mapper;

import com.e_commerce.search.dto.inventory.ProductInventoryRequest;
import com.e_commerce.search.dto.product.ProductVariantRequest;
import com.e_commerce.search.model.Products;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Map;

@Mapper(componentModel = "spring")
public interface ProductsMapper {

    @Mapping(target = "variantId",source = "product.variantId")
    Products toEntity(ProductVariantRequest product, ProductInventoryRequest inventory, Map<String, Object> variantInfo);
}
