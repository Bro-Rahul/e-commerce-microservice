package com.e_commerce.search.mapper;

import com.e_commerce.search.dto.product.ProductVariantRequest;
import com.e_commerce.search.model.Products;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductsMapper {

    Products toEntity(ProductVariantRequest request);
}
