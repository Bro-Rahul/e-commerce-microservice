package com.e_commerce.catalog.repo;

import com.e_commerce.catalog.dto.product.seller.SellerProductList;
import org.springframework.data.jpa.repository.JpaRepository;
import com.e_commerce.catalog.model.ProductsVariants;

import java.util.List;

public interface ProductVariantsRepo extends JpaRepository<ProductsVariants, String> {

    List<SellerProductList> findAllBy();

    List<ProductsVariants> findByProductId(String productId);
}
