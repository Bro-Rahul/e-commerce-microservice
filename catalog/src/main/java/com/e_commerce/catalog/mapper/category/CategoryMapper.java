package com.e_commerce.catalog.mapper.category;

import com.e_commerce.catalog.dto.category.CategoryResponse;
import com.e_commerce.catalog.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {


    @Mapping(target = "parentCategory",source = "parentCategory.name")
    CategoryResponse toDTO(Category category);

}
