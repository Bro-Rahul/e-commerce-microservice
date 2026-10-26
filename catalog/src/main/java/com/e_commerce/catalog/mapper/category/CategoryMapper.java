package com.e_commerce.catalog.mapper.category;

import com.e_commerce.catalog.dto.category.CategoryResponse;
import com.e_commerce.catalog.model.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {


    CategoryResponse toDTO(Category category);

}
