package com.e_commerce.catalog_service.dto.product;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductInStockRequest {

    @NotNull
    @Size(min = 1, message = "Enter Atleast one stock variant ")
    List<ProductStockVariants> productStocks;
}
