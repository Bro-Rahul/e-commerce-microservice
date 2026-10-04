package com.e_commerce.catalog.repo;

import com.e_commerce.catalog.model.Products;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepo extends MongoRepository<Products, String> {
}
