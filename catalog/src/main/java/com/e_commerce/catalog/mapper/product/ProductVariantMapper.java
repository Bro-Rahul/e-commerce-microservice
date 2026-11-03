package com.e_commerce.catalog.mapper.product;

import com.e_commerce.catalog.dto.product.seller.ProductCreationRequest;
import com.e_commerce.catalog.model.Category;
import com.e_commerce.catalog.model.Products;
import com.e_commerce.catalog.model.ProductsVariants;
import com.e_commerce.commons.dto.product.Variant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductVariantMapper {

    @Mapping(target = "title", source = "request.baseDetail.title")
    @Mapping(target = "category", source = "category")
    @Mapping(target = "description", source = "request.baseDetail.description")
    @Mapping(target = "about", source = "request.baseDetail.about")
    @Mapping(target = "metaDetails", source = "request.productMetaDetail")
    @Mapping(target = "product", source = "product")
    @Mapping(target = "coverImageURL", source = "coverImage")
    @Mapping(target = "userId", ignore = true)
    ProductsVariants toEntity(ProductCreationRequest request, Products product, Category category, String coverImage);


    @Mapping(target = "productId", source = "request.product.id")
    @Mapping(target = "category",source = "request.category.name")
    @Mapping(
            target = "productCategories",
            source = "request.category",
            qualifiedByName = "toProductCategories"
    )
    Variant toDTO(ProductsVariants request);

    @Named("toProductCategories")
    default List<String> toProductCategories(Category category) {
        List<String> allCategories = new ArrayList<>(
                category.getParentCategories()
        );

        allCategories.add(category.getName());

        return allCategories;
    }
}
