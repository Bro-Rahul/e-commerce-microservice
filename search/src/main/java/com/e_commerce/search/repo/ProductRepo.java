package com.e_commerce.search.repo;

import java.util.Optional;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import com.e_commerce.search.model.Products;

@Repository
public interface ProductRepo extends ElasticsearchRepository<Products, Long> {

    Optional<Products> findByProductId(String productId);

}
