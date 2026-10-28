package com.e_commerce.catalog.repo;

import com.e_commerce.catalog.dto.assets.SavedAssetsDTO;
import com.e_commerce.catalog.dto.product.seller.ProductBaseDetailsDTO;
import com.e_commerce.catalog.dto.product.seller.ProductVariantAssetsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import com.e_commerce.catalog.model.ProductsVariants;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductVariantsRepo extends JpaRepository<ProductsVariants, String> {

    @Query(value = """
    SELECT \s
        pv.variant_id,
        pv.title,
        pv.description,
        pv.about,
        c.name as "category"
    FROM products_variants pv
    LEFT JOIN category c on pv.category_id = c.id
    WHERE pv.variant_id =:variantId
""",nativeQuery = true)
    ProductBaseDetailsDTO getVariantById(@Param("variantId") String variantId);

    @Query(value = """
    SELECT \s
        pv.variant_id,
        pv.title,
        pv.description,
        pv.about,
        c.name as "category"
    FROM products_variants pv
    LEFT JOIN category c on pv.category_id = c.id
""",nativeQuery = true)
    List<ProductBaseDetailsDTO> findAllBy();

    Optional<ProductsVariants> findByVariantId(String variantId);

    List<ProductsVariants> findByProduct_id(String productId);
}
