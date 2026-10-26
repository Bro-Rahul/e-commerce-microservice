package com.e_commerce.catalog.dto.product.seller;
import com.e_commerce.commons.dto.product.ProductStatus;

public interface SellerProductList {

    String getProductId();

    String getVariantId();

    String getTitle();

    String getDescription();

    ProductStatus getProductStatus();
}