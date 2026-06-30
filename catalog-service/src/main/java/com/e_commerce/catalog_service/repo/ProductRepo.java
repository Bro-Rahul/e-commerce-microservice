package com.e_commerce.catalog_service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.e_commerce.catalog_service.model.Products;

public interface ProductRepo extends JpaRepository<Products, Long> {

}
