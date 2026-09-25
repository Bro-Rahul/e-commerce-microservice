package com.e_commerce.catalog.dto;


import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateCategoryRequest {

    @NotBlank(message = "Category Name must not be blank")
    private String name;

    @Nullable
    private String parentCategoryId;
}
