package com.e_commerce.catalog_service.mappers.product;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.e_commerce.catalog_service.dto.product.ProductBaseRequest;
import com.e_commerce.catalog_service.model.Products;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "category", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "productStatus", ignore = true)
    @Mapping(target = "createdAt", ignore = true)

    Products toEntity(ProductBaseRequest request);

}
