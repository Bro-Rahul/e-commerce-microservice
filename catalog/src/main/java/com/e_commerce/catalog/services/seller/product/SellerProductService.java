package com.e_commerce.catalog.services.seller.product;

import com.e_commerce.catalog.dto.assets.AssetsMetaDetails;
import com.e_commerce.catalog.dto.product.seller.ProductCreationRequest;
import com.e_commerce.catalog.dto.product.seller.SellerProductList;
import com.e_commerce.catalog.exceptions.category.CategoryNotFoundException;
import com.e_commerce.catalog.model.Products;
import com.e_commerce.catalog.rabbitmq.EventPublisher;
import com.e_commerce.catalog.repo.ProductRepo;
import com.e_commerce.catalog.services.seller.category.SellerCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerProductService {

    private final ProductRepo repo;
    private final SellerProductVariantService variantService;
    private final SellerCategoryService categoryService;


    public boolean isCategoryAvailable(String name){
        return categoryService.isCategoryPresent(name);
    }

    @Transactional
    public ResponseEntity<?> createProduct(
            String categoryName,
            List<ProductCreationRequest> productVariants,
            List<MultipartFile> images,
            List<AssetsMetaDetails> imageDetail
    ) {

        if(!isCategoryAvailable(categoryName)){
            throw new CategoryNotFoundException(
                    "Category is not Available ",
                    "Category_Not_Found",
                    "catalog/seller/product"
            );
        }

        Products product = repo.save(new Products());
        variantService.createVariants(product,productVariants,images,imageDetail);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<List<SellerProductList>> getProductList() {
        return variantService.getAllVariants();
    }
}
