package com.e_commerce.catalog_service.dto.product;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class ProductStockVariants {

    @NotNull
    @PositiveOrZero
    private Long stock;

    @NotNull
    private String sku;

    private List<String> attributes;

    private List<String> values;

}
