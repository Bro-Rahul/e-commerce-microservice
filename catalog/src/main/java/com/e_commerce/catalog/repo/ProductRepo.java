package com.e_commerce.catalog.repo;

import com.e_commerce.catalog.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepo extends JpaRepository<Products,String>  {
}
