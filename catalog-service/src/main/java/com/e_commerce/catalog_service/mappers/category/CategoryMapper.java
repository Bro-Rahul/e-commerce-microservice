package com.e_commerce.catalog_service.mappers.category;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.e_commerce.catalog_service.dto.category.ListCategory;
import com.e_commerce.catalog_service.model.Category;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    @Mapping(target = "category", source = "categoryName")
    @Mapping(target = "parentCategory", source = "parentCategory.id")
    ListCategory toListDTO(Category category);

}
