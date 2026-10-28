package com.e_commerce.catalog.services.seller.product;

import com.e_commerce.catalog.dto.assets.AssetsMetaDetails;
import com.e_commerce.catalog.dto.product.seller.ProductCreationRequest;
import com.e_commerce.catalog.exceptions.category.CategoryNotFoundException;
import com.e_commerce.catalog.model.Category;
import com.e_commerce.catalog.model.Products;
import com.e_commerce.catalog.repo.ProductRepo;
import com.e_commerce.catalog.services.seller.category.SellerCategoryService;
import com.e_commerce.catalog.services.seller.variant.SellerProductVariantCommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SellerProductCommandService {

    private final ProductRepo repo;
    private final SellerProductVariantCommandService variantService;
    private final SellerCategoryService categoryService;

    public Optional<Category> isCategoryAvailable(String name) {
        return categoryService.isCategoryPresent(name);
    }

    @Transactional
    public ResponseEntity<?> createProduct(
            String categoryName,
            List<ProductCreationRequest> productVariants,
            List<MultipartFile> images,
            List<AssetsMetaDetails> imageDetail) {

        Optional<Category> optionalCateogory = isCategoryAvailable(categoryName);
        if (optionalCateogory.isEmpty()) {
            throw new CategoryNotFoundException(
                    "Category is not Available ",
                    "Category_Not_Found",
                    "catalog/seller/product");
        }

        Products product = repo.save(new Products());
        variantService.createVariants(product, optionalCateogory.get(), productVariants, images, imageDetail);
        return ResponseEntity.ok().build();
    }
}
