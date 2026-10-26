package com.e_commerce.catalog.mapper.product;

import com.e_commerce.catalog.dto.product.seller.ProductCreationRequest;
import com.e_commerce.catalog.model.ProductsVariants;
import com.e_commerce.commons.dto.product.Variant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductVariantMapper {

    @Mapping(target = "title",source = "request.baseDetail.title")
    @Mapping(target = "category",source = "request.baseDetail.category")
    @Mapping(target = "description",source = "request.baseDetail.description")
    @Mapping(target = "about",source = "request.baseDetail.about")
    @Mapping(target = "metaDetails",source = "request.productMetaDetail")
    @Mapping(target = "productId",source = "productId")
    @Mapping(target = "coverImageURL",source = "coverImage")
    ProductsVariants toEntity(ProductCreationRequest request, String productId, String coverImage);

    Variant toDTO(ProductsVariants request);
}
