package com.e_commerce.search.mapper;

import com.e_commerce.commons.dto.inventory.ProductInventoryRequest;
import com.e_commerce.commons.dto.product.Variant;
import com.e_commerce.search.dto.product.SellerProduct;
import com.e_commerce.search.dto.search.PaginatedResponse;
import com.e_commerce.search.model.Products;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

import java.util.Map;

@Mapper(componentModel = "spring")
public interface ProductsMapper {

    @Mapping(target = "variantId",source = "product.variantId")
    Products toEntity(Variant product, ProductInventoryRequest inventory, Map<String, Object> variantInfo);

    @Mapping(target = "currentPage",source = "number")
    PaginatedResponse<Products> toPaginatedProduct(Page<Products> request);

    @Mapping(target = "currentPage",source = "number")
    PaginatedResponse<SellerProduct> toPaginatedSellerProduct(Page<SellerProduct> request);
}
