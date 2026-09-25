package com.e_commerce.catalog.repo;

import com.e_commerce.catalog.model.ProductCategory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductCategoryRepo extends MongoRepository<ProductCategory,String> {

    public Optional<ProductCategory> findByNameIgnoreCase(String name);

    public List<ProductCategory> findByParentCategoryId(String id);
}
