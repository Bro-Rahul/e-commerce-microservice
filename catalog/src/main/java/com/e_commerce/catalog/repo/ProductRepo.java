package com.e_commerce.catalog.repo;

import com.e_commerce.catalog.dto.product.seller.ProductResponseDTO;
import com.e_commerce.catalog.model.Products;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface ProductRepo extends JpaRepository<Products,String>  {

    @Query(value = """
    SELECT
        p.id AS "productId",
        pv.variant_id AS "variantId",
        pv.title AS "title",
        pv.description AS "description",
        pv.about AS "about",
        c.name AS "category"
    FROM products p
    LEFT JOIN products_variants pv
        ON p.id = pv.product_id
    LEFT JOIN category c
        ON pv.category_id = c.id
""",nativeQuery = true)
    List<ProductResponseDTO> findAllBy();

    @Query(value = """
    SELECT
        p.id AS "productId",
        pv.variant_id AS "variantId",
        pv.title AS "title",
        pv.description AS "description",
        pv.about AS "about",
        c.name AS "category"
    FROM products p
    LEFT JOIN products_variants pv
        ON p.id = pv.product_id
    LEFT JOIN category c
        ON pv.category_id = c.id
    WHERE p.id =:id
""",nativeQuery = true)
    List<ProductResponseDTO> findBy(@Param("id") String id);
}
