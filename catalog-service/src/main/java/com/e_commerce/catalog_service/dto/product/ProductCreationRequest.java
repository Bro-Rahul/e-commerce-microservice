package com.e_commerce.catalog_service.dto.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductCreationRequest {

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 50, message = "Title must be between 3 and 100 characters")
    private String title;

    @NotBlank(message = "Description is required ")
    @Size(min = 3, max = 1000, message = "Description must be between 3 and 1000 characters")
    private String description;

    @PositiveOrZero
    @NotNull
    private Double price;

    @NotNull
    private Object metaDetail;

    @NotBlank(message = "Category is required")
    @Size(min = 3, max = 50, message = "Category name must be between 3 to 50")
    private String category;

    @NotBlank(message = "About Item is required")
    @Size(min = 3, max = 1000, message = "About Item must be between 3 to 1000")
    private String aboutItem;

}
