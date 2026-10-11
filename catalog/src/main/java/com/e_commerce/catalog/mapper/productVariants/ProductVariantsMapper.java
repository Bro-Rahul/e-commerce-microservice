package com.e_commerce.catalog.mapper.productVariants;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.e_commerce.catalog.dto.product.ProductCreationRequest;
import com.e_commerce.catalog.model.ProductsVariants;

@Mapper(componentModel = "spring")
public interface ProductVariantsMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "productStatus", ignore = true)
    @Mapping(target = "coverImageURL", ignore = true)
    @Mapping(target = "assets", ignore = true)
    @Mapping(target = "productId", source = "productId")
    @Mapping(target = "title", source = "request.baseDetail.title")
    @Mapping(target = "description", source = "request.baseDetail.description")
    @Mapping(target = "category", source = "request.baseDetail.category")
    @Mapping(target = "aboutItem", source = "request.baseDetail.aboutItem")

    ProductsVariants toEntity(ProductCreationRequest request, String productId);

}
