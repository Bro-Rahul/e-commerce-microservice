package com.e_commerce.catalog_service.dto.product;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class ProductStockVariants {

    @NotBlank
    private String varientName;

    @NotNull
    @PositiveOrZero
    private Long stock;

    @NotNull
    private String sku;

    @NotNull
    @PositiveOrZero
    private Double price;

    private List<String> attributes;

    private List<String> values;

}
