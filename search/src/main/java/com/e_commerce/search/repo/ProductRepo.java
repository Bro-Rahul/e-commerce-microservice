package com.e_commerce.search.repo;

import java.util.Optional;

import com.e_commerce.search.dto.search.SearchFilter;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import com.e_commerce.search.model.Products;

@Repository
public interface ProductRepo extends ElasticsearchRepository<Products, String> {

    Optional<Products> findByProductId(String productId);

    Optional<Products> findByVariantId(String variantId);

}
