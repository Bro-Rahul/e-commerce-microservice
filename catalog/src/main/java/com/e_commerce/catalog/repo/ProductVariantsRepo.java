package com.e_commerce.catalog.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.e_commerce.catalog.model.ProductsVariants;

public interface ProductVariantsRepo extends MongoRepository<ProductsVariants, String> {

}
