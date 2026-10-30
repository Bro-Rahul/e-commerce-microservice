package com.e_commerce.catalog.dto.product.seller;

import com.e_commerce.commons.dto.product.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductVariantStatusDTO {

    private ProductStatus status;
}
